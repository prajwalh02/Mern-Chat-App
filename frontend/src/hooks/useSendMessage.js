import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../constants";

const useSendMessage = () => {

  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);

    try {
      const { token } = JSON.parse(localStorage.getItem("chat-user"));
      const { data } = await axios.post(`${BASE_URL}/api/message/send/${selectedConversation._id}`, {message},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if(data.error) {
        throw new Error(data.error);
      }
      
      setMessages([...messages, data]);

    } catch (error) {
      console.log("ERROR MESSAGE: ", error.response.data.error.message);
      toast.error(error.response.data.error.message);
    } finally {
      setLoading(false);
    }
  }  

  return { sendMessage, loading };
}

export default useSendMessage