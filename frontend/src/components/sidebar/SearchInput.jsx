import React, { useEffect, useState } from "react";
import useChat from "../../zustand/useChat";
import useGetChats from "../../hooks/useGetChats";
import toast from "react-hot-toast";
import { MdNotifications } from "react-icons/md";
import useGetNewNotification from "../../hooks/useGetNewNotification";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const Navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { setSelectedChat } = useChat();
  const { chats } = useGetChats();
  const { notifications, clearNotifications } = useGetNewNotification();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false); // Track if there's a new notification

  const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const profilePic = userData.profilePic || ""; // Fallback to an empty string if not present

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search input must be at least 3 characters long");
    }

    const chat = chats.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (chat) {
      setSelectedChat(chat);
      setSearch("");
    } else toast.error("No such user found!");
  };

  // Handle notification dropdown
  const handleNotification = () => {
    if (!isNotificationOpen) {
      // Mark notifications as seen and reset state
      setHasNewNotification(false);
    } else {
      // Clear all notifications when closing the dropdown
      clearNotifications();
    }
    setIsNotificationOpen(!isNotificationOpen);
  };

  // Trigger red color when a new notification is received
  useEffect(() => {
    if (notifications.length > 0) {
      setHasNewNotification(true); // Set icon color to red on new notification
    }
  }, [notifications]); // Run this effect whenever notifications change

  const handleProfileClick = () => {
    Navigate('/settings')
  }

  return (
    <>
      <div className="mt-2 flex justify-between items-center">
      <div className="cursor-pointer" onClick={handleProfileClick}>
          {/* Render profile picture */}
          <img
            src={profilePic}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
        <h1 className="text-3xl text-[#00A3FF] font-bold top-4">Chat Mate</h1>
        <div className="relative">
          <div
            className={`p-2 rounded-md bg-[#00A3FF] mr-3 cursor-pointer`}
            onClick={handleNotification}
          >
            <MdNotifications className="h-6 w-6 text-white" />
          </div>

          {/* Notification Badge */}
          {hasNewNotification && (
            <span className="absolute -top-1 right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {notifications.length}
            </span>
          )}
        </div>
      </div>

      {/* Notification Dropdown */}
      {isNotificationOpen && (
        <div className="absolute left-[13%] mt-3 w-64 bg-[#5a5959] text-white shadow-lg rounded-lg p-4 z-10">
          <div className="text-sm mb-2 font-medium">Notifications</div>
          <div className="space-y-2">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div key={index} className="border-b border-gray-400 pb-2 mb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{notification.senderName}</span>
                    <span className="text-xs">{notification.time}</span>
                  </div>
                  <p className="text-xs">
                    {notification.message.length > 45
                      ? `${notification.message.slice(0, 45)}...`
                      : notification.message}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-sm text-center py-2 text-gray-300">
                No new notifications
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-4">
        <form className="w-full mx-auto" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="search"
              value={search}
              className="block w-full p-4 ps-10 text-sm text-[#e4ecec] border border-[#4A4B4B] outline-none rounded-lg bg-[#151515] focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Chats..."
              required
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchInput;
