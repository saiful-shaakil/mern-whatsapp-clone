import React from "react";
import ChatContainer from "./ChatContainer";
import Sidebar from "./Sidebar";

const MainPage = () => {
  return (
    <div className="grid place-items-center h-[100vh] bg-[#dadbd3]">
      <div className="flex bg-[#ededed] h-[90vh] w-[90vw]">
        <Sidebar />
        <ChatContainer />
      </div>
    </div>
  );
};

export default MainPage;
