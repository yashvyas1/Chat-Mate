import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import useSendMessage from "../../hooks/useSendMessages";

const MessageInput = () => {
  const [messagetext, setMessageText] = useState("");
  const { sendMessage, loading } = useSendMessage();
  const handleSend = async (e) => {
    e.preventDefault();
    if(!messagetext) return;
    await sendMessage(messagetext);
    setMessageText("");
  };
  return (
    <div className="h-full bg-[#121212] w-full flex gap-2">
      <form
        className="flex w-full items-center justify-between"
        onSubmit={handleSend}
      >
        <input
          type="text"
          value={messagetext}
          placeholder="Type message..."
          className="input bg-[#121212] text-[#a5a4a4] text-lg border-none focus:outline-none outline-none w-[85%] ml-8 mt-2"
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button
          type="submit"
          className="text-white bg-[#00A3FF] flex gap-2 items-center rounded-md  px-2 py-2 cursor-pointer mr-8"
        >
          Send <FiSend className="w-4 h-4 " />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
