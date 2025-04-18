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
                <span className="review-date">{review.date}</span>
                <span className={`review-status ${review.status}`}>
                  {review.status}
                </span>
              </div>
              <div className="review-content">
                <p>{review.comment}</p>
              </div>
              <div className="review-meta">
                <span className="reviewer">Review by: Teacher</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Review;
