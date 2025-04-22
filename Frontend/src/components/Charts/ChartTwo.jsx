import React, { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { SubmissionContext } from "../../context/SubmissionContext";

const ChartTwo = () => {
  const { getSubmissionProgress } = useContext(SubmissionContext);
  const percentage = getSubmissionProgress();

  return (
    <div style={{ width: 150, height: 150, margin: 20 }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          rotation: 0.25,
          strokeLinecap: "butt",
          textSize: "16px",
          pathTransitionDuration: 0.5,
          pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
          textColor: "#C82333",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      />
    </div>
  );
};

export default ChartTwo;
