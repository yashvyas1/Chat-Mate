import { useState } from "react";
import toast from "react-hot-toast";
import useHandleUnauthorized from "./useHandleUnauthorized.js";

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const { handleUnauthorizedUser } = useHandleUnauthorized();

  const updateUser = async ({ fullName, gender, bio }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/user/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, gender, bio }),
      });
      if (response.status === 401) {
        handleUnauthorizedUser();
        return;
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("userData", JSON.stringify(data));
      toast.success(data.message);
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { updateUser, loading };
};

export default useUpdateUser;
