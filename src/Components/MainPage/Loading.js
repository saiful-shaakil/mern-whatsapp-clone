import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center h-screen justify-center">
      <div className="animate-spin">
        <div className="h-10 w-10 bg-green-500"></div>
      </div>
    </div>
  );
};

export default Loading;
