import React from "react";
import auth from "../../firebase";
import { useAuthState } from "react-firebase-hooks";

const Sidebar = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className="flex flex-col flex-[0.35]">
      <div className="flex justify-between p-[20px] border-2">
        <div className="flex items-center">
          {/* Avatar */}
          <h5 className="ml-[10px]">{user.displayName}</h5>
        </div>
        <div className="flex items-center justify-between min-w-[10vw]">
          {/* Donut Chat More margin-right: 2vw;
  font-size: 24px !important; */}
        </div>
      </div>
      <div className="flex items-center bg-[#f6f6f6] h-[40px] p-[10px]">
        <div className="flex items-center bg-white w-full h-[35px] rounded-md pl-[5px]">
          {/* search outline icon color: gray;
  padding: 10px; */}
          <input
            type="text"
            className="border-none w-[80%] ml-[10px] focus:outline-none"
            placeholder="Search or start new chat"
          />
        </div>
      </div>
      <div className="flex-[1] bg-white overflow-y-scroll">New Chat Room</div>
    </div>
  );
};

export default Sidebar;
