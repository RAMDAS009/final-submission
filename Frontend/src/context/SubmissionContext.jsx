import React, { createContext, useEffect, useState } from "react";

export const SubmissionContext = createContext();

export const SubmissionProvider = ({ children }) => {
  const [studentSubmissions, setStudentSubmissions] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedSubmissions = localStorage.getItem("studentSubmissions");
    const storedReviews = localStorage.getItem("studentReviews");

    if (storedSubmissions) {
      setStudentSubmissions(JSON.parse(storedSubmissions));
    }

    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(
      "studentSubmissions",
      JSON.stringify(studentSubmissions)
    );
  }, [studentSubmissions]);

  useEffect(() => {
    localStorage.setItem("studentReviews", JSON.stringify(reviews));
  }, [reviews]);

  const addSubmission = (submission) => {
    setStudentSubmissions((prev) => [...prev, submission]);
  };

  const addReview = (rollNo, comment) => {
    const newReview = {
      rollNo,
      comment,
      date: new Date().toLocaleString(),
      status: "pending", // can be 'pending', 'resolved'
    };
    setReviews((prev) => [...prev, newReview]);

    // Update submission status if needed
    setStudentSubmissions((prev) =>
      prev.map((sub) =>
        sub.rollNo === rollNo ? { ...sub, status: "needsRevision" } : sub
      )
    );
  };

  const acceptSubmission = (rollNo) => {
    setStudentSubmissions((prev) =>
      prev.map((sub) =>
        sub.rollNo === rollNo ? { ...sub, status: "accepted" } : sub
      )
    );
  };

  return (
    <SubmissionContext.Provider
      value={{
        studentSubmissions,
        addSubmission,
        reviews,
        addReview,
        acceptSubmission,
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
};
