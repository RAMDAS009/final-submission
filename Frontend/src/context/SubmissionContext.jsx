import React, { createContext, useEffect, useState } from "react";

export const SubmissionContext = createContext();

export const SubmissionProvider = ({ children }) => {
  // ---------------- Student State ----------------
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:3000/project/students", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setStudents(data.students);
      } else {
        console.error("Failed to fetch students");
      }
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ---------------- Submission State ----------------
  const [studentSubmissions, setStudentSubmissions] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [totalSubmittedTasks, setTotalSubmittedTasks] = useState(0); // NEW

  useEffect(() => {
    const loadFromStorage = (key, setter) => {
      const data = localStorage.getItem(key);
      if (data) setter(JSON.parse(data));
    };

    loadFromStorage("studentSubmissions", setStudentSubmissions);
    loadFromStorage("completedTasks", setCompletedTasks);
    loadFromStorage("studentReviews", setReviews);

    const totalCount = localStorage.getItem("totalSubmittedTasks");
    if (totalCount) setTotalSubmittedTasks(JSON.parse(totalCount));
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "studentSubmissions",
      JSON.stringify(studentSubmissions)
    );
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    localStorage.setItem("studentReviews", JSON.stringify(reviews));
    localStorage.setItem(
      "totalSubmittedTasks",
      JSON.stringify(totalSubmittedTasks)
    );
  }, [studentSubmissions, completedTasks, reviews, totalSubmittedTasks]);

  const addSubmission = (submission) => {
    setStudentSubmissions((prev) => {
      const exists = prev.some(
        (sub) =>
          sub.rollNo === submission.rollNo &&
          sub.project === submission.project &&
          sub.subtitle === submission.subtitle
      );

      if (!exists) {
        setTotalSubmittedTasks((prevCount) => prevCount + 1); // Count only new submissions
        return [
          ...prev,
          {
            ...submission,
            status: "submitted",
            date: new Date().toLocaleString(),
          },
        ];
      }

      return prev;
    });
  };

  const addReview = (rollNo, project, subtitle, comment) => {
    const newReview = {
      rollNo,
      project,
      subtitle,
      comment,
      date: new Date().toLocaleString(),
      status: "needsRevision",
    };

    setReviews((prev) => [...prev, newReview]);

    setStudentSubmissions((prev) =>
      prev.map((sub) =>
        sub.rollNo === rollNo &&
        sub.project === project &&
        sub.subtitle === subtitle
          ? { ...sub, status: "needsRevision" }
          : sub
      )
    );
  };

  const acceptSubmission = (rollNo, project, subtitle) => {
    let acceptedTask = null;

    setStudentSubmissions((prev) =>
      prev.map((sub) => {
        const isTarget =
          sub.rollNo === rollNo &&
          sub.project === project &&
          sub.subtitle === subtitle;

        if (isTarget) {
          acceptedTask = { ...sub, status: "accepted" };
          return acceptedTask;
        }

        return sub;
      })
    );

    if (acceptedTask) {
      setCompletedTasks((prev) => {
        const alreadyCompleted = prev.some(
          (task) =>
            task.rollNo === acceptedTask.rollNo &&
            task.project === acceptedTask.project &&
            task.subtitle === acceptedTask.subtitle
        );
        return alreadyCompleted ? prev : [...prev, acceptedTask];
      });
    }
  };

  const getProgress = () => {
    const totalTasks = 4; // Set your total number of tasks here
    const completed = completedTasks.length;
    return Math.floor((completed / totalTasks) * 100);
  };

  const getSubmissionProgress = () => {
    const totalTasks = 4; // Set your total number of tasks here
    const submitted = studentSubmissions.length;
    return Math.min(100, Math.floor((submitted / totalTasks) * 100));
  };

  const submittedCount = studentSubmissions.length;
  const completedCount = completedTasks.length;

  return (
    <SubmissionContext.Provider
      value={{
        // Students
        students,
        fetchStudents,

        // Submissions
        studentSubmissions,
        addSubmission,
        reviews,
        addReview,
        acceptSubmission,
        completedTasks,
        getProgress,
        getSubmissionProgress,
        submittedCount,
        completedCount,
        totalSubmittedTasks, // <-- use this in your Dashboard
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
};
