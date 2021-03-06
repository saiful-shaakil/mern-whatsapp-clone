import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Pusher from "pusher-js";
import auth from "../firebase";
import {
  faCircleDot,
  faMessage,
  faEllipsisVertical,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import SidebarChat from "./SidebarChat";
const Sidebar = () => {
  const [contacts, setContacts] = useState([]);
  const [commonContacts, setCommonContacts] = useState([]);
  const [user, loading] = useAuthState(auth);
  //useEffect for get all contacts for each email
  useEffect(() => {
    fetch(
      `https://cryptic-eyrie-74234.herokuapp.com/get-contacts/${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, [user?.email]);
  //useEffect for get common contacts for all user
  useEffect(() => {
    fetch("https://cryptic-eyrie-74234.herokuapp.com/common-contacts")
      .then((res) => res.json())
      .then((data) => setCommonContacts(data));
  }, []);
  useEffect(() => {
    const pusher = new Pusher("6187cf4f74e1a58bc91c", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("contacts");
    channel.bind("inserted", (newContact) => {
      setContacts([...contacts, newContact]);
    });
  }, [contacts]);
  return (
    <div className="flex border-r-2 flex-col flex-[0.35] min-w-[250px]">
      <div className="flex justify-between p-[20px]">
        <div className="flex items-center">
          <img
            src={
              user?.photoURL ||
              "https://img.freepik.com/free-photo/british-shorthair-kitten-3-5-months-old-sitting-looking-up_191971-4591.jpg?w=2000"
            }
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
        {commonContacts.map((contact) => (
          <SidebarChat key={contact._id} contact={contact} />
        ))}
        {contacts.map((contact) => (
          <SidebarChat key={contact._id} contact={contact} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
