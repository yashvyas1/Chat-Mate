import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useChat from "../zustand/useChat";
import useHandleUnauthorized from "./useHandleUnauthorized";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedChat } = useChat();
  const handleUnauthorizedUser = useHandleUnauthorized();


  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/messages/get/${selectedChat._id}`);
        if (response.status === 401) {
          handleUnauthorizedUser();
		  return;
        }
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedChat?._id) getMessages();
  }, [selectedChat?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
