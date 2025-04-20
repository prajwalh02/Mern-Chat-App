import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import { useEffect, useRef } from "react";

const Messages = ({ messages, loading }) => {
  
  const messagesRef = useRef();

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto" ref={messagesRef}>
      { loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} /> )}

      { !loading && messages.length === 0 && (
        <p className="text-gray-300 text-sm text-center">Send a Message to Start a Conversation</p>
      )}

      { !loading && messages.map((item, index) => (
        <Message data={item} key={index} />
      ))}
    </div>
  );
};

export default Messages;
