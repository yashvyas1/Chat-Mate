import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useHandleUnauthorized = () => {
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate(); // Make sure the variable name is lowercase
  const handleUnauthorizedUser = () => {
    // Clear session data
    sessionStorage.removeItem("token");
    localStorage.removeItem("userData"); // If you're storing it there too
    setAuthUser(null); // Reset the authentication state in your app
    toast.error('Your session expired, Please Login Again!! ')
    navigate("/login"); // Redirect to login
  };

  return handleUnauthorizedUser; // Make sure to return the function
};

export default useHandleUnauthorized;

