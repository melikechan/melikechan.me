// components/ProgressBar.jsx
import React from "react";

const ProgressBar = ({ progress }) => {
  const progressBarWidth = `${progress}%`;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className={`h-2.5 rounded-full bg-primary`}
        style={{ width: progressBarWidth }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
};

export default ProgressBar;
