import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useChat from "../zustand/useChat";

import notificationSound from "../assets/sound/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedChat } = useChat();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (
        selectedChat &&
        (newMessage.senderId === selectedChat._id ||
          newMessage.receiverId === selectedChat._id)
      ) {
        // Add the message to the state only if it belongs to the selected chat
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        setMessages([...messages, newMessage]);
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
