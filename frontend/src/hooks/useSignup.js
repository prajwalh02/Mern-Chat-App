import { useState } from "react"
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async(signupData) => {
    const success = handleInputErrors(signupData);
    if(!success) return;

    setLoading(true);
    try {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(signupData),
        })

        const data = await res.json();
        console.log(data);
        
    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  };
  return { loading, signup }
}

export default useSignup

const handleInputErrors = ({fullName, username, password, confirmPassword, gender}) => {
    if(!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    if(password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if(password.length < 6) {
        toast.error("Password must be at least 6 characters long");
    }

    return true;
}