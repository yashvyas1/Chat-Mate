// import React, { useEffect, useState } from 'react'
// import Chat from './Chat'
// import useGetChats from '../../hooks/useGetChats'
// import { getRandomEmoji } from '../../utils/emojis';
// import useGetNewNotification from '../../hooks/useGetNewNotification';

// const Chats = () => {
//   const {loading, chats} = useGetChats();
//   const {notifications} = useGetNewNotification();
//    // State for storing notification counts
//    const [notificationCounts, setNotificationCounts] = useState({});

//    useEffect(() => {
//     // Group notifications by user ID
//     const counts = notifications.reduce((acc, notif) => {
//       acc[notif.senderId] = (acc[notif.senderId] || 0) + 1;
//       return acc;
//     }, {});
//     setNotificationCounts(counts);
//   }, [notifications]); // Re-run when notifications change

//   const ClearNotification = (chatId) => {
//     console.log("called with", chatId);

//     // Update notification count to 0 for the selected chat
//     setNotificationCounts(prevCounts => {
//       const updatedCounts = {
//         ...prevCounts,
//         [chatId]: 0, // Set the count to 0 for the selected chat
//       };
//       console.log("Updated notification counts:", updatedCounts);
//       return updatedCounts;
//     });
//   };
//   return (
//     <>
//     <div className='py-2 flex flex-col gap-4'>
//       {chats.map((chat, idx) => (
// 				<Chat
// 					key={chat._id}
// 					chat={chat}
// 					emoji={getRandomEmoji()}
// 					lastIdx={idx === chat.length - 1}
//           notificationCount={notificationCounts[chat._id] || 0} // Pass notification count
//           clearNotification={ClearNotification} // Pass the function as a prop
// 				/>
// 			))}
//       {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
//     </div>
//     </>
//   )
// }

// export default Chats



import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import useGetChats from "../../hooks/useGetChats";
import { getRandomEmoji } from "../../utils/emojis";
import useGetNewNotification from "../../hooks/useGetNewNotification";

const Chats = () => {
  const { loading, chats } = useGetChats();
  const { notifications, setNotifications } = useGetNewNotification(); // Add setNotifications to clear notifications
  const [notificationCounts, setNotificationCounts] = useState({});

  useEffect(() => {
    // Group notifications by sender ID
    const counts = notifications.reduce((acc, notif) => {
      acc[notif.senderId] = (acc[notif.senderId] || 0) + 1;
      return acc;
    }, {});
    setNotificationCounts(counts);
  }, [notifications]);

  const clearNotification = (chatId) => {
    // Clear notifications for the selected chat
    setNotificationCounts((prevCounts) => ({
      ...prevCounts,
      [chatId]: 0,
    }));

    // Remove notifications related to the selected chat
    setNotifications((prev) =>
      prev.filter((notif) => notif.senderId !== chatId)
    );
  };

  return (
    <div className="py-2 flex flex-col gap-4">
      {chats.map((chat) => (
        <Chat
          key={chat._id}
          chat={chat}
          emoji={getRandomEmoji()}
          notificationCount={notificationCounts[chat._id] || 0} // Pass notification count
          clearNotification={clearNotification} // Pass function to clear notifications
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Chats;
