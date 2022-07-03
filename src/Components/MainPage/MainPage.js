import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ChatContainer from "./ChatContainer";
import Sidebar from "./Sidebar";

const MainPage = () => {
  return (
    <div className="grid place-items-center h-[100vh] bg-[#dadbd3]">
      <div className="flex bg-[#ededed] h-[90vh] w-[90vw]">
        <Sidebar />
        <Routes>
          <Route
            path="/contacts/:contactId"
            element={<ChatContainer />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

export default MainPage;
