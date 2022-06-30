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
import SidebarChat from "./SidebarChat";
const Sidebar = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className="flex border-r-2 flex-col flex-[0.35]">
      <div className="flex justify-between p-[20px]">
        <div className="flex items-center">
          <img
            src={user.photoURL}
            alt="profile"
            className="rounded-[50%] h-16 w-16"
          />
          <h5 className="ml-[10px] font-semibold text-[20px]">
            {user?.displayName}
          </h5>
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
      <div className="flex items-center bg-[#f6f6f6] h-[40px] p-[10px] py-8">
        <div className="flex items-center bg-white w-full h-[35px] rounded-[20px]">
          <FontAwesomeIcon
            className="p-[10px] text-gray-600"
            icon={faMagnifyingGlass}
          />
          <input
            type="text"
            className="border-none w-[80%] mx-[10px] focus:outline-none"
            placeholder="Search or start new chat"
          />
        </div>
      </div>
      <div className="flex-[1] bg-white overflow-y-scroll">
        <SidebarChat addNewChat />
        <SidebarChat name="Shakil" id={"i9e"} />
        <SidebarChat name="Dev Room" id={"i9e"} />
      </div>
    </div>
  );
};

export default Sidebar;
