import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext"; // Assuming you have a socket context
import useHandleUnauthorized from "./useHandleUnauthorized.js";

const useGetChats = () => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const { socket } = useSocketContext(); // Get socket from context
//   const { handleUnauthorizedUser } = useHandleUnauthorized();
const handleUnauthorizedUser = useHandleUnauthorized();

  const fetchChats = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/user/get", {
        method: "GET",
        credentials: "include", // Ensure cookies are sent with the request
      });
      if (response.status === 401) {
        handleUnauthorizedUser();
        return;
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setChats(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchChats();

    // Listen for new notifications
    socket?.on("newNotification", (notificationMessage) => {
      if (notificationMessage.notification.includes("joined")) {
        fetchChats(); // Fetch updated chats
      }
    });

    return () => socket?.off("newNotification");
  }, [socket]);

  return { loading, chats };
};

export default useGetChats;
