// // import React, { useEffect, useState } from "react";
// // import useChat from "../../zustand/useChat.js";
// // import { useSocketContext } from "../../context/SocketContext.jsx";

// // const Chat = ({ chat, lastIdx, emoji, notificationCount, clearNotification }) => {
// //   const { selectedChat, setSelectedChat } = useChat();
// //   const [notiCount, setNotiCount] = useState(notificationCount)
// //   const isSelected = selectedChat?._id === chat._id;
// //   const { onlineUsers } = useSocketContext();
// // 	const isOnline = onlineUsers.includes(chat._id);

// //   useEffect(() => {
// //     // Update local notification count when the prop changes (new notification received)
// //     setNotiCount(notificationCount);
// //   }, [notificationCount]); // Re-run when notificationCount prop changes

// //   const handleClick = async () => {
// //     setSelectedChat(chat); // Select the chat
// //     await clearNotification(chat._id); // Call the passed clearNotification function
// //     setNotiCount(0); // Clear notification count locally after clicking
// //   };

// //   return (
// //     <>
// //       <div
// //         className={`flex gap-3 hover:bg-[#0C3F5B] rounded-md p-2 ${
// //           isSelected ? "bg-[#0C3F5B]" : ""
// //         }
// //         `}
// //         onClick={handleClick}
// //       >
// //         <div className={`avatar ${isOnline ? "online" : ""}`}>
// //           <div className="w-12 rounded-full">
// //             <img src={chat.profilePic} alt="user avatar" />
// //           </div>
// //         </div>
// //         <div className="flex flex-col flex-1">
// //           <div className="flex gap-3 justify-between">
// //             <div className="flex flex-col items-start">
// //               <p className="font-bold text-[#DADADA] text-xl">
// //                 {chat.fullName}
// //                 {notiCount > 0 && (
// //                 <span className="ml-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
// //                   {notiCount}
// //                 </span>
// //               )}
// //               </p>
// //               <p className="text-[#aaaaaa]">{chat.email}</p>
// //             </div>
// //             <span className="text-xl">{emoji}</span>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Chat;


// import React, { useEffect, useState } from "react";
// import useChat from "../../zustand/useChat.js";
// import { useSocketContext } from "../../context/SocketContext.jsx";

// const Chat = ({ chat, lastIdx, emoji, notificationCount, clearNotification }) => {
//   const { selectedChat, setSelectedChat } = useChat();
//   const [notiCount, setNotiCount] = useState(notificationCount); // Local state for notification count
//   const isSelected = selectedChat?._id === chat._id;
//   const { onlineUsers } = useSocketContext();
//   const isOnline = onlineUsers.includes(chat._id);

//   useEffect(() => {
//     // Update local notification count when the prop changes (new notification received)
//     setNotiCount(notificationCount);
//   }, [notificationCount]); // Re-run when notificationCount prop changes

//   const handleClick = async () => {
//     setSelectedChat(chat); // Select the chat
//     await clearNotification(chat._id); // Call the passed clearNotification function
//     // No need to manually set `setNotiCount(0)` here because the prop will update automatically
//   };

//   return (
//     <>
//       <div
//         className={`flex gap-3 hover:bg-[#0C3F5B] rounded-md p-2 ${isSelected ? "bg-[#0C3F5B]" : ""}`}
//         onClick={handleClick}
//       >
//         <div className={`avatar ${isOnline ? "online" : ""}`}>
//           <div className="w-12 rounded-full">
//             <img src={chat.profilePic} alt="user avatar" />
//           </div>
//         </div>
//         <div className="flex flex-col flex-1">
//           <div className="flex gap-3 justify-between">
//             <div className="flex flex-col items-start">
//               <p className="font-bold text-[#DADADA] text-xl">
//                 {chat.fullName}
//                 {notiCount > 0 && (
//                   <span className="ml-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
//                     {notiCount}
//                   </span>
//                 )}
//               </p>
//               <p className="text-[#aaaaaa]">{chat.email}</p>
//             </div>
//             <span className="text-xl">{emoji}</span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Chat;


import React, { useEffect } from "react";
import useChat from "../../zustand/useChat.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

const Chat = ({ chat, lastIdx, emoji, notificationCount, clearNotification }) => {
  const { selectedChat, setSelectedChat } = useChat();
  const isSelected = selectedChat?._id === chat._id; // Check if the chat is selected
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(chat._id);

  const handleClick = async () => {
    setSelectedChat(chat); // Select the chat
    await clearNotification(chat._id); // Clear the notification for the clicked chat
  };

  return (
    <div
      className={`flex gap-3 hover:bg-[#0C3F5B] rounded-md p-2 ${isSelected ? "bg-[#0C3F5B]" : ""}`}
      onClick={handleClick}
    >
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="w-12 rounded-full">
          <img src={chat.profilePic} alt="user avatar" />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="font-bold text-[#DADADA] text-xl">{chat.fullName}</p>
            {/* Show red dot if there are notifications */}
            {notificationCount > 0 && (
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            )}
          </div>
          <span className="text-xl">{emoji}</span>
        </div>
        <p className="text-[#aaaaaa] text-sm italic">{chat.bio || 'Hey there! I am using Chat-Mate'}</p>
      </div>
    </div>
  );
};

export default Chat;

