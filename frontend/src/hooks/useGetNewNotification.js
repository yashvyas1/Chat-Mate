import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import notificationSound from "../assets/sound/notification.mp3";
import useChat from "../zustand/useChat";

const useGetNewNotification = () => {
  const [notifications, setNotifications] = useState([]); // Store all notifications
  const { socket } = useSocketContext();
  const { selectedChat } = useChat();

  useEffect(() => {
    socket?.on("newNotification", (notificationMessage) => {
      // Ensure the sender is not the current selected chat
      if (notificationMessage.sender !== selectedChat?._id) {
        // Add the new notification to the notifications array
        setNotifications((prev) => [
          ...prev,
          {
            id: Date.now(), // Unique ID
            message: notificationMessage.message,
            senderName: notificationMessage.senderName,
            senderId: notificationMessage.sender,
            time: notificationMessage.time,
          },
        ]);
        // Play the notification sound
        const sound = new Audio(notificationSound);
        sound.play();
      }
    });

    return () => socket?.off("newNotification");
  }, [socket, selectedChat]);

  const clearNotifications = () => {
    setNotifications([]); // Clear the notifications array
  };

  return { notifications, setNotifications, clearNotifications };
};

export default useGetNewNotification;
