import { useState } from "react"
import axios from "axios";
import { BASE_URL } from "../constants";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async(signupData) => {

    setLoading(true);
    try {
        const data = await axios.post(`${BASE_URL}/api/auth/signup`, signupData)
        if(data.error) {
            throw new Error(data.error);
        }
        // localStorage
        localStorage.setItem("chat-user", JSON.stringify(data));
        // context
        if(!data.error) {
          setAuthUser(data);
          return data;
        } else throw data.error;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        setLoading(false);
    }
  };
  return { loading, signup }
}

export default useSignup

export const handleInputErrors = ({fullName, username, password, confirmPassword, gender}) => {
    if(!fullName || !username || !password || !confirmPassword || !gender) {
        throw new Error("Please fill in all fields");
    }

    if(password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }

    if(password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }
}