import React, { useContext, useState, useEffect } from "react";
import { SubmissionContext } from "../../context/SubmissionContext";

const UploadFile = ({ task }) => {
  const { addSubmission, acceptSubmission, studentSubmissions } =
    useContext(SubmissionContext);

  const [file, setFile] = useState(null);
  const [currentUser, setCurrentUser] = useState({ name: "", rollNo: "" });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser({
        name: parsedUser.name,
        rollNo: parsedUser.rollNo,
      });
    }
  }, []);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    if (!task?.title || !task?.subtitle) {
      alert("Task information is incomplete.");
      return;
    }

    const alreadySubmitted = studentSubmissions.some(
      (submission) =>
        submission.rollNo === currentUser.rollNo &&
        submission.project === task.title &&
        submission.subtitle === task.subtitle
    );

    if (alreadySubmitted) {
      alert("You've already submitted this task.");
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64File = e.target.result;

      const newSubmission = {
        rollNo: currentUser.rollNo,
        name: currentUser.name,
        project: task.title,
        subtitle: task.subtitle,
        file: {
          name: file.name,
          data: base64File,
        },
        date: new Date().toISOString().split("T")[0],
        status: "submitted",
      };

      // Add submission and accept it after slight delay
      addSubmission(newSubmission);

      setTimeout(() => {
        acceptSubmission(currentUser.rollNo, task.title, task.subtitle);
        alert("✅ File uploaded and submitted successfully!");
        setFile(null);
        setIsUploading(false);
      }, 150);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        onChange={(e) => setFile(e.target.files[0])}
        accept=".pdf,.doc,.docx,.txt"
        disabled={isUploading}
        style={{ display: "none" }} // hide default input
      />
      <label
        htmlFor="fileInput"
        className={`custom-file-label ${isUploading ? "disabled" : ""}`}
      >
        Choose File
      </label>

      {file && <p>Selected: {file.name}</p>}

      <button onClick={handleUpload} disabled={!file || isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadFile;
