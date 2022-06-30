import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SidebarChat = ({ addNewChat, name, id }) => {
  const [messages, setMessages] = useState([]);
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 6000000));
  }, []);
  const createChat = () => {
    const roomName = prompt("Please enter name for chat");
  };

  return !addNewChat ? (
    <Link className="" to={`/rooms/${id}`}>
      <div className="flex items-center p-[20px] cursor-pointer border-b-2 hover:bg-[#ebebeb]">
        <img
          className="rounded-[50%] h-10 w-10"
          alt="avatar"
          src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
        />
        <div className="ml-[15px]">
          <h3 className="m-0 text-xl font-semibold">{name}</h3>
          <p className="m-0 text-[15px]">{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div
      onClick={createChat}
      className="flex items-center p-[20px] cursor-pointer border-b-2 hover:bg-[#ebebeb]"
    >
      <div className="ml-[15px]">
        <h3 className="m-0 font-semibold">Add New Chat</h3>
      </div>
    </div>
  );
};

export default SidebarChat;
