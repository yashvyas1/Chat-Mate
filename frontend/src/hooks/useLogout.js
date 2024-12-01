import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import useHandleUnauthorized from "./useHandleUnauthorized.js";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { handleUnauthorizedUser } = useHandleUnauthorized();

  const logout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 401) {
        handleUnauthorizedUser();
		return;
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("userData");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
