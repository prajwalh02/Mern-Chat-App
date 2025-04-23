import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const Message = ({ data }) => {
  const { message, createdAt } = data;
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const isMe = data.senderId === authUser._id;
  const chatClassName = isMe ? "chat-end" : "chat-start";
  const profilePic  = isMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = isMe ? 'bg-blue-500' : "";
  const shakeClass = data.shouldShake ? "shake" : "";

  const timeStamp = new Date(createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });


  return (
    <div className={`chat ${chatClassName}`}>
      {/* Avatar */}
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={profilePic}
            alt="User profile"
            className="object-cover w-full h-full"
          />
        </div>
      </div> 

      {/* Message Content */}
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} `}>{message}</div>
      <div className="text-xs text-gray-100 mt-1 pr-1">{timeStamp}</div>

    </div>
  );
};

export default Message;
