import React from 'react'
import SearchInput from './SearchInput'
import Chats from './Chats'
import { BiLogOut } from "react-icons/bi";
import useLogout from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';


const ChatSidebar = () => {
 const {loading, logout} = useLogout();
 const Navigate = useNavigate();

  const handleLogout = async () => {
  await logout();
  Navigate('/login');
  }

  return (
    <div className='flex flex-col w-full h-full bg-[#0f0f0f] p-4'>
      <div className='h-[18%]'>
      <SearchInput />
      </div>
      <div className="text-[#e4ecec] mt-6">Chats</div>
      <div className='h-[70%] mt-4 overflow-y-auto scrollbar-thin scrollbar-webkit'>
        <Chats />
      </div>
      <div onClick={handleLogout} className='h-[5%] p-4'>
        {loading? (<span className='loading loading-spinner'></span>) : (<BiLogOut className='w-8 h-8 text-white cursor-pointer'/>)}
      </div>
    </div>
  )
}

export default ChatSidebar
