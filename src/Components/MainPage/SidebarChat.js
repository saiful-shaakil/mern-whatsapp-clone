import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../firebase";

const SidebarChat = ({ addNewChat, contact }) => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 6000000));
  }, []);
  const createChat = () => {
    const contact = prompt("Please enter a name for chat");
    if (contact) {
      const newContact = {
        name: contact,
        by: user.email,
        img: `https://avatars.dicebear.com/api/open-peeps/${seed}.svg`,
      };
      fetch("http://localhost:5000/insert-contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newContact),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  return !addNewChat ? (
    <Link className="" to={`/contacts/${contact?._id}`}>
      <div className="flex items-center p-[20px] cursor-pointer border-b-2 hover:bg-[#ebebeb]">
        <img
          className="rounded-[50%] h-10 w-10"
          alt="avatar"
          src={contact?.img}
        />
        <div className="ml-[15px]">
          <h3 className="m-0 text-xl font-semibold">{contact?.name}</h3>
          {/* <p className="m-0 text-[15px]">{messages[0]?.message}</p> */}
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
