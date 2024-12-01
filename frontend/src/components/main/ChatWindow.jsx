import React, { useEffect } from "react";
import ChatUser from "./ChatUser";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useAuthContext } from "../../context/AuthContext";
import { TiMessages } from "react-icons/ti";
import useChat from "../../zustand/useChat.js";

const ChatWindow = () => {
  const {selectedChat, setSelectedChat} = useChat();
  

  useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedChat(null);
	}, [setSelectedChat]);
  return (
    <>
      <div className="flex flex-col text-[#323232] w-full h-full">
        {!selectedChat ? (
          <NoChatSelected />
        ) : (
          <>
            <div className="h-[12%] bg-[#111111]">
              <ChatUser selectedChat={selectedChat}/>
            </div>
            <div className="h-[80%] bg-[#181818] overflow-y-auto scrollbar-thin scrollbar-webkit">
              <Messages />
            </div>
            <div className="h-[10%] bg-[#181818]">
              <MessageInput />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatWindow;

const NoChatSelected = () => {
  const user = JSON.parse(localStorage.getItem('userData'));
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {user.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
