import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router";
import auth from "../firebase";
const ChatContainer = () => {
  const [user, loading] = useAuthState(auth);
  const { roomId } = useParams();

  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMessage = (e) => {
    e.preventDefault();
  };
  return (
    <div className="chat">
      <div className="chat-header">
        <img alt="profile" className="rounded-[50%] h-10 w-10 bg-black" />
        <div className="chat-header-info">
          <h3>{roomName}</h3>
          <p>
            Last seen at{" "}
            {new Date(messages[messages.length - 1]?.timestamp?.toDate())
              .toUTCString()
              .slice(16, 29)}
          </p>
        </div>
        <div className="chat-header-right">
          {/* <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton> */}
        </div>
      </div>
      <div className="chat-body">
        {messages.map((message) => (
          <p
            key={message?.timestamp?.nanoseconds}
            className={`chat-message ${
              message?.name === user?.displayName && "chat-receiver"
            }`}
          >
            <span className="chat-name">{message?.name}</span>
            {message?.message}
            <span className="chat-time">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat-footer">
        {/* <InsertEmoticon /> */}
        <form>
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
            name=""
            id=""
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        {/* <Mic /> */}
      </div>
    </div>
  );
};

export default ChatContainer;
