import React, { useState } from "react";
import Img from "../../assets/sideimage.png";
import useLogin from "../../hooks/useLogin";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isLogin = await login({ email, password });
    if (isLogin) {
      setEmail("");
      setPassword("");
      Navigate('/');
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around items-center w-full md:w-[60%] h-auto md:h-[75%] shadow-md shadow-black rounded-lg p-4 bg-[#202227]">
      <div className="w-full lg:w-[50%] min-h-full p-4 mt-4 md:mt-0">
        <h1 className="text-3xl md:text-2xl text-center text-blue-500 mb-4">Chat Mate</h1>
        <div className="divider h-0.5 divider-primary mb-4"></div>
        <h2 className="text-lg md:text-xl text-blue-400">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="label p-2">
              <span className="text-sm md:text-base label-text text-[#696F79]">Email</span>
            </label>
            <input
              type="email"
              autoComplete="username"
              placeholder="example@gmail.com"
              className="w-full input input-bordered h-10 bg-[#43464f] text-[#c9bfbf]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="label">
              <span className="text-sm md:text-base label-text text-[#696F79]">Password</span>
            </label>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10 bg-[#43464f] text-[#c9bfbf]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              className="btn btn-active btn-primary mt-8 w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="flex justify-between items-center">
          <p className="text-sm md:text-base text-[#696F79]">Don't have an account?</p>
          <Link to={'/signup'} className="btn btn-link text-blue-800 text-sm md:text-base">
            SignUp
          </Link>
        </div>
      </div>

      <div className="hidden lg:block w-full md:w-[45%] min-h-full">
        <img src={Img} alt="Banner Image" className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default Login;

