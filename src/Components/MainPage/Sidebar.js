import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase";
import {
  faCircleDot,
  faMessage,
  faEllipsisVertical,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
const Sidebar = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className="flex flex-col flex-[0.35]">
      <div className="flex justify-between p-[20px] border-2">
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWVufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            alt="profile"
            className="rounded-[50%] h-16 w-16"
          />
          <h5 className="ml-[10px]">{user?.displayName || "Shakil"}</h5>
        </div>
        <div className="flex items-center justify-between min-w-[10vw]">
          <FontAwesomeIcon
            className="text-2xl mr-[2vw] cursor-pointer text-black/[.54]"
            icon={faCircleDot}
          />
          <FontAwesomeIcon
            className="text-2xl mr-[2vw] cursor-pointer text-black/[.54]"
            icon={faMessage}
          />
          <FontAwesomeIcon
            className="text-2xl cursor-pointer mr-[2vw] text-black/[.54]"
            icon={faEllipsisVertical}
          />
        </div>
      </div>
      <div className="flex items-center bg-[#f6f6f6] h-[40px] p-[10px]">
        <div className="flex items-center bg-white w-full h-[35px] rounded-md pl-[5px]">
          {/* search outline icon color: gray;
  padding: 10px; */}
          <FontAwesomeIcon
            className="p-[10px] text-gray-600"
            icon={faMagnifyingGlass}
          />
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
