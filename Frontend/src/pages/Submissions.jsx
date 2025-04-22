import React, { useContext, useState, useEffect } from "react";
import "./Submissions.css";
import { SubmissionContext } from "../context/SubmissionContext";

const Submissions = () => {
  const { studentSubmissions, addReview, acceptSubmission } =
    useContext(SubmissionContext);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [comment, setComment] = useState("");
  const [teacherName, setTeacherName] = useState("");

  // Load teacher name from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setTeacherName(storedUsername);
    }
  }, []);

  const handleAccept = (submission) => {
    const { rollNo, project, subtitle } = submission;
    acceptSubmission(rollNo, project, subtitle);
    alert(
      `Submission accepted by ${teacherName} for ${submission.name} (${rollNo})`
    );
  };

  const handleAddComment = (student) => {
    setSelectedStudent(student);
    setComment("");
  };

  const handleSubmitComment = () => {
    if (!comment.trim()) {
      alert("Please enter a review comment");
      return;
    }

    const { rollNo, project, subtitle } = selectedStudent;
    addReview(rollNo, project, subtitle, comment);
    alert(
      `${teacherName}'s review submitted for ${selectedStudent.name}: ${comment}`
    );
    setSelectedStudent(null);
  };

  const handleCancelComment = () => {
    setSelectedStudent(null);
  };

  const getStatusBadge = (submission) => {
    switch (submission.status) {
      case "accepted":
        return (
          <span className="status-badge accepted">
            Accepted by {teacherName || "Teacher"}: {submission.name} (
            {submission.rollNo})
          </span>
        );
      case "needsRevision":
        return (
          <span className="status-badge needs-revision">
            Needs Revision (Reviewed by {teacherName || "Teacher"})
          </span>
        );
      default:
        return <span className="status-badge pending">Pending Review</span>;
    }
  };

  return (
    <div className="submissions-container">
      <h2>Student Submissions - Reviewed by {teacherName || "Teacher"}</h2>

      {studentSubmissions.length === 0 ? (
        <p className="no-submissions">No submissions yet.</p>
      ) : (
        <div className="card-container">
          {studentSubmissions.map((submission, index) => (
            <div key={`${submission.rollNo}-${index}`} className="card">
              <div className="card-header"></div>
              <div className="card-body">
                <p>
                  <strong>Project:</strong> {submission.project}
                </p>
                <p>
                  <strong>Task:</strong> {submission.subtitle}
                </p>
                <p>
                  <strong>Submitted On:</strong> {submission.date}
                </p>
                <a
                  href={submission.file.data}
                  download={submission.file.name}
                  className="download-link"
                >
                  Download File
                </a>
              </div>
              <div className="button-group">
                <button
                  className="accept-btn"
                  onClick={() => handleAccept(submission)}
                >
                  Accept
                </button>
                <button
                  className="comment-btn"
                  onClick={() => handleAddComment(submission)}
                >
                  Add Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedStudent && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>
              {teacherName || "Teacher"}'s Review for {selectedStudent.name}
            </h3>
            <textarea
              placeholder={`Write your review as ${
                teacherName || "Teacher"
              }...`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
            ></textarea>
            <div className="popup-buttons">
              <button className="cancel-btn" onClick={handleCancelComment}>
                Cancel
              </button>
              <button className="submit-btn" onClick={handleSubmitComment}>
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Submissions;
