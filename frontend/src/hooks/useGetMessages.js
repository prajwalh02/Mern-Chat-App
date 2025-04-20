import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import { BASE_URL } from "../constants";
import axios from "axios";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const { selectedConversation, messages, setMessages } = useConversation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation?._id) return;

      setLoading(true);
      try {
        const { token } = JSON.parse(localStorage.getItem("chat-user"));
        const { data } = await axios.get(
          `${BASE_URL}/api/message/${selectedConversation._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if(selectedConversation?._id) fetchMessages();

  }, [selectedConversation?._id, setMessages]);

  return { messages, loading }
};

export default useGetMessages;
