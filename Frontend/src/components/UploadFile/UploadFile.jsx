import React, { useContext, useState, useEffect } from "react";
import { SubmissionContext } from "../../context/SubmissionContext";

const UploadFile = ({ task }) => {
  const { addSubmission } = useContext(SubmissionContext);
  const [file, setFile] = useState(null);
  const [currentUser, setCurrentUser] = useState({ name: "", rollNo: "" });

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

  const handleUpload = () => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64File = e.target.result;

      const submission = {
        rollNo: currentUser.rollNo,
        name: currentUser.name,
        project: task?.title || "Untitled Project",
        file: {
          name: file.name,
          data: base64File,
        },
        date: new Date().toISOString().split("T")[0],
      };

      addSubmission(submission);
      alert("File uploaded and submission sent!");
      setFile(null);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        accept=".pdf,.doc,.docx,.txt"
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadFile;
