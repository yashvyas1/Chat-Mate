import React, { useState } from "react";
import Img from "../../assets/sideimage.png";
import GenderCheckbox from "./GenderCheckbox";
import useSignup from "../../hooks/useSignUp";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const Navigate = useNavigate();
  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSignup = await signup(inputs);
    if (isSignup) {
      setInputs({});
      Navigate("/login");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around w-full md:w-[90%] lg:w-[70%] h-auto md:h-[82%] shadow-md shadow-black rounded-lg p-4 bg-[#202227] overflow-hidden">
      {/* Left Section */}
      <div className="w-full md:w-[45%] min-h-full p-4 overflow-y-auto">
        <h1 className="text-2xl text-center text-blue-500 top-4">Chat Mate</h1>
        <div className="divider h-0.5 divider-primary"></div>
        <h2 className="text-xl text-blue-400">Register Now</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-[#696F79]">
                Full Name
              </span>
            </label>
            <input
              type="text"
              autoComplete="on"
              placeholder="Enter your name"
              className="w-full input input-bordered h-10 bg-[#43464f] text-[#c9bfbf]"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-[#696F79]">Email</span>
            </label>
            <input
              type="email"
              autoComplete="email"
              placeholder="example@gmail.com"
              className="w-full input input-bordered h-10 bg-[#43464f] text-[#c9bfbf]"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-[#696F79]">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10 bg-[#43464f] text-[#c9bfbf]"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-[#696F79]">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10 bg-[#43464f] text-[#c9bfbf]"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <div>
            <button
              className="btn btn-active btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Register Account"
              )}
            </button>
          </div>
        </form>
        <div className="flex justify-between">
          <p className="text-base text-[#696F79] mt-3">
            Already have an account?
          </p>
          <Link to={"/login"} className="btn btn-link text-blue-800">
            Login
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block w-full md:w-[50%] min-h-full">
        <img
          src={Img}
          alt="Banner Image"
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default SignUp;

