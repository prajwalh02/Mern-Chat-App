import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    try {
    //   handleInputErrors({username, password});
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      if (res.error) {
        throw new Error(res.error.message);
      }

      localStorage.setItem("chat-user", JSON.stringify(res));
      setAuthUser(res);

      return res;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;


export const handleInputErrors = ({username, password}) => {
    if(!username || !password) {
        throw new Error("Please enter username and password");
    }
}