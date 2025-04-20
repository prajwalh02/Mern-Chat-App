import Conversation from "./Conversation";
import getRandomEmoji from "../../utils/emojis";

const Conversations = ({ filteredConversations, loading }) => {
  console.log("CONVERSATION: ", filteredConversations);

  if (loading) return <span className="loading loading-spinner mx-auto"></span>;

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {filteredConversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIndex={idx === filteredConversations.length - 1}
        />
      ))}
    </div>
  );
};

export default Conversations;
