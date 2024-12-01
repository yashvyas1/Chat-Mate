import { useState } from "react";
import toast from "react-hot-toast";
import useChat from "../zustand/useChat";
import useHandleUnauthorized from "./useHandleUnauthorized.js";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedChat } = useChat();
  const { handleUnauthorizedUser } = useHandleUnauthorized();

  const sendMessage = async (messageText) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/messages/send/${selectedChat._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageText }),
      });
      if (response.status === 401) {
        handleUnauthorizedUser();
		return;
      }
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
