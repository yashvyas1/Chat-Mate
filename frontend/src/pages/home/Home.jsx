import React from 'react'
import ChatSidebar from '../../components/sidebar/ChatSidebar'
import ChatWindow from '../../components/main/ChatWindow'

const Home = () => {
  return (
    <div>
      <div className='flex w-full h-screen'>
        <div className='w-[30%]'>
        <ChatSidebar />
        </div>
        <div className='w-[70%]'>
        <ChatWindow />
        </div>
      </div>
    </div>
  )
}

export default Home
