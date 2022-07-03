import { useEffect, useState } from "react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./Components/MainPage/MainPage";
import RequireAuth from "./Components/RequireAuth";
import LogIn from "./Components/MainPage/LogIn";
import ChatContainer from "./Components/MainPage/ChatContainer";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="*"
          element={
            <RequireAuth>
              <MainPage />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<LogIn />}></Route>
      </Routes>
    </div>
  );
}

export default App;
