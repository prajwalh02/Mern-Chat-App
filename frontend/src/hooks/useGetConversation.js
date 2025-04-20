import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import { toast } from "react-hot-toast";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations ] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const { token } = JSON.parse(localStorage.getItem("chat-user"));
        setLoading(true);
        if (!token) {
          throw new Error("No token found");
        }
        const { data } = await axios.get(`${BASE_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data);
        setFilteredConversations(data);
      } catch (error) {
        console.log("ERROR MESSAGE: ", error.response.data.error.message);
        toast.error(error.response.data.error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations, setConversations, filteredConversations, setFilteredConversations };
};

export default useGetConversation;
