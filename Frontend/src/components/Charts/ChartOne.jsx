import React, { useContext } from "react";
import { SubmissionContext } from "../../context/SubmissionContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ChartOne = () => {
  const { getProgress } = useContext(SubmissionContext);
  const percentage = getProgress(); // Get the progress from context

  return (
    <div style={{ width: 150, height: 150, margin: 20 }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`} // ✅ Correct string interpolation
        styles={buildStyles({
          rotation: 0.25,
          pathTransition: "stroke-dashoffset 0.5s ease 0s",
          strokeLinecap: "butt",
          textSize: "16px",
          pathColor: `rgba(62, 152, 199, ${percentage / 100})`, // ✅ Correct template literal
          textColor: "#C82333",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      />
    </div>
  );
};

export default ChartOne;
