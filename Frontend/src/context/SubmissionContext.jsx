import React, { createContext, useEffect, useState } from "react";

export const SubmissionContext = createContext();

export const SubmissionProvider = ({ children }) => {
  const [studentSubmissions, setStudentSubmissions] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadFromStorage = (key, setter) => {
      const data = localStorage.getItem(key);
      if (data) setter(JSON.parse(data));
    };

    loadFromStorage("studentSubmissions", setStudentSubmissions);
    loadFromStorage("completedTasks", setCompletedTasks);
    loadFromStorage("studentReviews", setReviews);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "studentSubmissions",
      JSON.stringify(studentSubmissions)
    );
  }, [studentSubmissions]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem("studentReviews", JSON.stringify(reviews));
  }, [reviews]);

  const addSubmission = (submission) => {
    setStudentSubmissions((prev) => {
      const exists = prev.some(
        (sub) =>
          sub.rollNo === submission.rollNo &&
          sub.project === submission.project &&
          sub.subtitle === submission.subtitle
      );

      if (!exists) {
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

  // Progress based on accepted tasks
  const getProgress = () => {
    const totalTasks = 4;
    const completed = completedTasks.length;
    return Math.floor((completed / totalTasks) * 100);
  };

  // Progress based on submitted tasks
  const getSubmissionProgress = () => {
    const totalTasks = 4;
    const submitted = studentSubmissions.length;
    return Math.min(100, Math.floor((submitted / totalTasks) * 100));
  };

  const submittedCount = studentSubmissions.length;
  const completedCount = completedTasks.length;

  return (
    <SubmissionContext.Provider
      value={{
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
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
};
