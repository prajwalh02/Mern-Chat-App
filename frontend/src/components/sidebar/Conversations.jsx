import useGetConversation from "../../hooks/useGetConversation";
import Conversation from "./Conversation";
import getRandomEmoji from "../../utils/emojis";


const Conversations = () => {
  const { conversations, loading } = useGetConversation();

  console.log("CONVERSATION: ", conversations);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation 
          key={conversation._id} 
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIndex={idx === conversations.length - 1}  
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
