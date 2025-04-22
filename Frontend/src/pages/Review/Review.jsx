import React, { useContext } from "react";
import "./Review.css";
import { SubmissionContext } from "../../context/SubmissionContext";

const Review = () => {
  const { reviews } = useContext(SubmissionContext);

  return (
    <div className="review-container">
      <h2>Your Project Reviews</h2>

      {reviews.length === 0 ? (
        <p className="no-reviews">
          No reviews yet. Check back after your submission has been reviewed.
        </p>
      ) : (
        <div className="review-list">
          {reviews.map((review, idx) => (
            <div className="review-card" key={idx}>
              <div className="review-header">
                <div>
                  <strong>Project:</strong> {review.project}
                </div>
                <div>
                  <strong>Task:</strong> {review.subtitle}
                </div>
              </div>

              <div className="review-body">
                <p className="review-comment">"{review.comment}"</p>
              </div>

              <div className="review-footer">
                <span className="review-meta">Date: {review.date}</span>
                <span className={`review-status ${review.status}`}>
                  {review.status === "needsRevision" ? "" : review.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Review;
