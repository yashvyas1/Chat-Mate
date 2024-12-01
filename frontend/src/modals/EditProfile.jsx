import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import useUpdateUser from '../hooks/useUpdateUser';

const EditProfile = ({ isOpen, onClose, userDetails }) => {
  // Use state to hold the editable values
  const [fullName, setFullName] = useState(userDetails.fullName || '');
  const [email, setEmail] = useState(userDetails.email || '');
  const [gender, setGender] = useState(userDetails.gender || '');
  const [bio, setBio] = useState(userDetails.bio || '');
  const {updateUser, loading} = useUpdateUser();

  useEffect(() => {
    if (isOpen) {
      setFullName(userDetails.fullName || '');
      setEmail(userDetails.email || '');
      setGender(userDetails.gender || '');
      setBio(userDetails.bio || '');
    }
  }, [isOpen, userDetails]);

  const handleSubmit = async (e) => {
        e.preventDefault();
        const isUpdated = await updateUser({ fullName, gender, bio });
        if (isUpdated) {
          setFullName("");
          setGender("");
          setBio("");
        }
    // Close the modal after submitting
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-[#1d232a] p-6 rounded-lg w-[80%] sm:w-[60%] lg:w-[40%]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-white font-semibold">Edit Profile</h2>
            <button onClick={onClose} className="text-white">
              <MdClose size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className='font-normal text-lg'>
            <div className="space-y-4">
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-300">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-2 p-2 bg-transparent border border-gray-600 rounded-md text-white outline-none"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-300">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 p-2 bg-transparent border border-gray-600 rounded-md text-gray-500 outline-none"
                  readOnly
                />
              </div>

              {/* Gender */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-300">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mt-2 p-2 bg-transparent border border-gray-600 rounded-md text-white outline-none"
                >
                  <option className='bg-[#1d232a] text-sm' value="" disabled>Select Gender</option>
                  <option className='bg-[#1d232a] text-sm' value="Male" disabled={gender === 'Male'}>Male</option>
                  <option className='bg-[#1d232a] text-sm' value="Female" disabled={gender === 'Female'}>Female</option>
                </select>
              </div>


              {/* Bio */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-300">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-2 p-2 bg-transparent border border-gray-600 rounded-md text-white outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className=" py-2 w-[30%] bg-blue-600 rounded-md text-white"
                disabled={loading}
              >{loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Save"
              )}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EditProfile;
