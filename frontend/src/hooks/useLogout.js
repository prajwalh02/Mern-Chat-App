
import { useState } from "react"
import axios from "axios"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast"
import { BASE_URL } from "../constants";

const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`${BASE_URL}/api/auth/logout`)    
            console.log(res)
            if(res.error) {
                throw new Error(res.error)
            }
            localStorage.removeItem('chat-user');
            setAuthUser(null);
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return { logout, loading }
}

export default useLogout