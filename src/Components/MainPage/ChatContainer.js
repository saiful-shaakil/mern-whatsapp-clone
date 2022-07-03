import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router";
import auth from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pusher from "pusher-js";
import {
  faMagnifyingGlass,
  faPaperclip,
  faEllipsisVertical,
  faFaceGrin,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
const ChatContainer = () => {
  const { contactId } = useParams();
  const [user, loading] = useAuthState(auth);
  const [input, setInput] = useState("");
  const [contact, setContact] = useState(null);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    fetch(`https://cryptic-eyrie-74234.herokuapp.com/contacts/${contactId}`)
      .then((res) => res.json())
      .then((data) => setContact(data[0]));
  }, [contactId]);
  useEffect(() => {
    fetch(`https://cryptic-eyrie-74234.herokuapp.com/get-messages/${contactId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [contactId]);
  useEffect(() => {
    const pusher = new Pusher("6187cf4f74e1a58bc91c", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  const sendMessage = (e) => {
    e.preventDefault();
    const name = user?.displayName.split(" ")[0];
    const message = {
      name: name,
      email: user?.email,
      message: input,
      timestamp: new Date().toLocaleTimeString(),
      received: false,
      messengerId: contactId,
    };
    fetch("https://cryptic-eyrie-74234.herokuapp.com/insert-messages", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        setInput("");
      });
  };
  return (
    <div className="flex-[0.65] flex flex-col">
      <div className="p-[16px] flex items-center border-b-[1px]">
        <img
          src={contact?.img}
          alt="Profile"
          className="rounded-[50%] h-10 w-10"
        />
        <div className="flex-[1] pl-5 min-w-fit">
          <h3 className="font-semibold min-w-fit">{contact?.name}</h3>
          <p className="text-gray-600 min-w-fit">
            Last seen at {contact?.timestamp}{" "}
          </p>
        </div>
        <div className="flex justify-between min-w-[100px] pr-6">
          <FontAwesomeIcon
            className="text-[18px] cursor-pointer"
            icon={faMagnifyingGlass}
          />
          <FontAwesomeIcon
            className="text-[18px] cursor-pointer"
            icon={faPaperclip}
          />
          <FontAwesomeIcon
            className="text-[18px] cursor-pointer"
            icon={faEllipsisVertical}
          />
        </div>
      </div>
      <div
        className="flex-[1] bg-repeat p-[30px] overflow-y-scroll"
        style={{
          backgroundImage:
            "url(" +
            "https://i.pinimg.com/originals/35/f3/e9/35f3e9c4b86568b4919949a9307da2a9.png" +
            ")",
          backgroundPosition: "center",
        }}
      >
        {messages.map((message) => (
          <p
            key={message._id}
            className={`relative text-[15px] p-[10px] rounded-[10px] min-w-fit w-fit bg-[#ffffff] mb-[30px] ${
              message?.email === user?.email && "ml-auto bg-[#dcf8c6]"
            }`}
          >
            <span className="absolute mt-[-25px] font-extrabold text-xs min-w-fit">
              {message?.name}
            </span>
            {message?.message}
            <span className="font-extrabold text-xs min-w-fit ml-[10px] text-gray-600">
              {message.timestamp}
            </span>
          </p>
        ))}
      </div>
      <div className="flex justify-between items-center h-[60px] border-t-[1px] border-t-[lightgray]">
        <FontAwesomeIcon
          icon={faFaceGrin}
          className="p-[15px] cursor-pointer text-[18px]"
        />
        <form className="flex-[1] flex">
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            value={input}
            className="flex-[1] rounded-[30px] p-[10px] border-none"
            placeholder="Type a message"
            name=""
            id="input-message"
          />
          <button className="hidden" type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <FontAwesomeIcon
          icon={faMicrophone}
          className="text-[20px] cursor-pointer p-[15px]"
        />
      </div>
    </div>
  );
};

export default ChatContainer;
