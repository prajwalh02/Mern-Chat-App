import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);

      return data;
    } catch (error) {
        console.log(error);
        throw error.response.data.error;
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