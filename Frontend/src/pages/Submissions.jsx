import React, { useContext, useState } from "react";
import "./Submissions.css";
import { SubmissionContext } from "../context/SubmissionContext";

const Submissions = () => {
  const { studentSubmissions, addReview, acceptSubmission } =
    useContext(SubmissionContext);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [comment, setComment] = useState("");

  const handleAccept = (rollNo) => {
    acceptSubmission(rollNo);
    alert(`Submission accepted for Roll No: ${rollNo}`);
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

    addReview(selectedStudent.rollNo, comment);
    alert(`Review submitted for ${selectedStudent.name}: ${comment}`);
    setSelectedStudent(null);
  };

  const handleCancelComment = () => {
    setSelectedStudent(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return <span className="status-badge accepted">Accepted</span>;
      case "needsRevision":
        return (
          <span className="status-badge needs-revision">Needs Revision</span>
        );
      default:
        return <span className="status-badge pending">Pending Review</span>;
    }
  };

  return (
    <div className="submissions-container">
      <h2>Student Submissions</h2>

      {studentSubmissions.length === 0 ? (
        <p className="no-submissions">No submissions yet.</p>
      ) : (
        <div className="card-container">
          {studentSubmissions.map((submission) => (
            <div key={submission.rollNo} className="card">
              <div className="card-header">
                <h3>
                  {submission.name} ({submission.rollNo})
                  {getStatusBadge(submission.status)}
                </h3>
              </div>
              <div className="card-body">
                <p>
                  <strong>Project:</strong> {submission.project}
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
                  onClick={() => handleAccept(submission.rollNo)}
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
            <h3>Review for {selectedStudent.name}</h3>
            <textarea
              placeholder="Write your review here..."
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
