import React from "react";
import useChat from "../../zustand/useChat";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const user = JSON.parse(localStorage.getItem('userData'));
	const { selectedChat } = useChat();
	const fromMe = message.senderId === user._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? user.profilePic : selectedChat?.profilePic;
	const bubbleBgColor = fromMe ? "bg-[#3caac5]" : "";

	const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={profilePic} />
          </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
          {message?.message}
        </div>
        <div className="chat-footer opacity-50 text-xs text-[#A0A0A0] flex gap-1 items-center">
          {formattedTime}
        </div>
      </div>
    </>
  );
};

export default Message;
