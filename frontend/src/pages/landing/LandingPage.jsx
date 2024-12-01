import React from 'react';
import Laptop from '../../assets/laptop.png'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const Navigate = useNavigate();

    const handleLoginClick = () => {
        Navigate('/login')
    }

    const handleSignupClick = () => {
        Navigate('/signup')
    }
  return (
    <div className="bg-[#1d232a] text-white max-h-screen flex flex-col gap-4 mx-28">
      <header className="w-full py-8 flex justify-between items-center">
        <div className="text-3xl text-[#20a2fa] font-bold">Chat Mate</div>
        <div>
          <button className=" text-[#20a2fa] py-2 px-2 font-bold mr-8" onClick={handleLoginClick}>Login</button>
          <button className="bg-[#20a2fa] text-white py-2 px-4 rounded-lg" onClick={handleSignupClick}>Register</button>
        </div>
      </header>

      <div className='flex justify-between'>
      <section className="w-[30%] flexflex-col items-center justify-between pt-14">
        
        <h1 className="text-4xl font-semibold mb-4">
          Start chatting with random people, anytime, anywhere with Chat Mate
        </h1>
        <p className="text-lg mb-8">
          Great software that allows you to chat from any place at any time without any interruption.
        </p>
        <button className="bg-blue-500 text-white px-8 py-3 rounded-lg text-xl" onClick={handleSignupClick}>Start Chatting Now</button>
      </section>

      <section className="flex justify-center items-center py-16">
        <div className="relative right-20 -mt-24">
          <img
            src={Laptop}
            alt="Laptop"
            className="max-w-[33rem]"
          />
        </div>
      </section>
      </div>
    </div>
  );
};

export default LandingPage;
