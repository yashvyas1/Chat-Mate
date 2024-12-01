import React from 'react'
import { useSocketContext } from '../../context/SocketContext';

const ChatUser = ({selectedChat}) => {
  const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(selectedChat._id);
  return (
    <div className='flex p-3 ml-2'>
      <div className={`avatar ${isOnline? 'online' : ''}`}>
        <div className="w-12 rounded-full">
          <img src={selectedChat.profilePic} alt="user avatar" />
        </div>
      </div>
      <div className="ml-4">
        <h2 className=" text-xl text-[#F0F0F0] font-bold">{selectedChat.fullName}</h2>
        <span className={`text-sm ${isOnline ? 'text-[#00A3FF]' : 'text-[#706f6f]'}`}>{isOnline? 'Online' : 'Offline'}</span>
      </div>
    </div>
  )
}

export default ChatUser
