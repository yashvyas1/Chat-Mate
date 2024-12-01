import "./App.css";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { Toaster } from "react-hot-toast";
import { Navigate, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Setting from "./pages/home/Setting";
import LandingPage from "./pages/landing/LandingPage";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="h-screen bg-[#1d232a]">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <LandingPage />}
          />
          <Route
            path="/login"
            element={
              authUser ? (
                <Navigate to="/" />
              ) : (
                <div className=" h-full flex items-center justify-center">
                  <Login />
                </div>
              )
            }
          />
          <Route
            path="/signup"
            element={
              authUser ? (
                <Navigate to="/" />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <SignUp />
                </div>
              )
            }
          />
          <Route
            path="/settings"
            element={
              authUser ? <Setting /> : <Navigate to="/login" />
            }
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
