import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import EditProfile from "../../modals/EditProfile";

const Setting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData")) || {};

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="h-screen w-full p-8 bg-[#1d232a] text-white rounded-lg shadow-md flex flex-col items-center gap-2">
      {/* Profile Section */}
      <div className="flex jutify-center mx-auto gap-6">
        <img
          src={user.profilePic}
          alt="Profile"
          className="h-20 w-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-semibold">{user.fullName}</h1>
          <p className="">{user.email}</p>
          <p className="mt-2 italic text-gray-500">
            {user.bio && user.bio.length > 100
              ? `${user.bio.slice(0, 100)}...`
              : user.bio || "Your Bio will appear here!"}
          </p>
        </div>
      </div>
      <div className="divider w-[70%] mx-auto"></div>

      {/* User Details */}
      <div className="mt-8 w-[60%] ">
        <h2 className="text-lg font-bold flex justify-between">
          User Details{" "}
          <span
            className="flex text-sky-600 gap-1 items-center text-md cursor-pointer hover:text-sky-500"
            onClick={openModal}
          >
            Edit <MdModeEdit />
          </span>
          <EditProfile
            isOpen={isModalOpen}
            onClose={closeModal}
            userDetails={user}
          />
        </h2>
        <div className="grid grid-cols-2 gap-8 mt-4 text-gray-500">
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              value={user.fullName}
              readOnly
              className="w-full mt-1 p-2 border rounded-md bg-transparent outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full mt-1 p-2 border rounded-md bg-transparent outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Gender</label>
            <input
              type="text"
              value={user.gender.toUpperCase()}
              readOnly
              className="w-full mt-1 p-2 border rounded-md bg-transparent outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Bio</label>
            <textarea
              value={user.bio || "Your Bio will appeare here"}
              readOnly
              className="w-full mt-1 p-2 border rounded-md bg-transparent resize-none outline-none"
            />
          </div>
        </div>
      </div>
      <div className="divider w-[70%] mx-auto"></div>

      {/* Additional Section */}
      <div className="mt-8 w-[60%]">
        <h2 className="text-lg font-bold">User Insights</h2>
        <div className="mt-4 p-4 bg-transparent rounded-md shadow">
          <p className="">
            Track your progress and view personalized insights here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Setting;
