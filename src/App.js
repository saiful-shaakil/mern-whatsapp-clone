import { useState } from "react";
import "./App.css";
import LogIn from "./Components/LogIn";
import Sidebar from "./Components/MainPage/Sidebar";

function App() {
  const [user] = useState("");
  return (
    <div className="grid place-items-center h-[100vh] bg-[#dadbd3]">
      {user ? (
        <LogIn />
      ) : (
        <div className="flex bg-[#ededed] h-[90vh] w-[90vw]">
          <Sidebar />
        </div>
      )}
    </div>
  );
}

export default App;
