import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import axios from "axios";
import { BASE_URL } from "../../constants";
import toast from "react-hot-toast";

const MessageContainer = () => {
  const { selectedConversation, messages, setMessages } = useConversation();
  const [ loading, setLoading ] = useState(false);

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
        toast.error(error.message)
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedConversation?._id]);


  return (
    <div className="md:min-w-[600px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text ">To: </span>
            {""}
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>

          <Messages messages={messages} loading={loading} />
          <MessageInput messages={messages} setMessages={setMessages} />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { fullName } = JSON.parse(localStorage.getItem("chat-user"));
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {fullName} ✨</p>
        <p>Select a chat to start Messaging</p>
        <TiMessages className="text-3xl  md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
