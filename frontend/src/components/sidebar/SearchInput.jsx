import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";

const SearchInput = ({ conversations, setFilteredConversations }) => {

  const handleSubmit = (val) => {
    if (!val.trim()) {
      setFilteredConversations(conversations);
      return;
    };

    const conversation = conversations.filter((c) =>
      c.fullName.toLowerCase().includes(val.trim().toLowerCase())
    );
    
    if (conversation.length>0) {
      setFilteredConversations(conversation);
    } else {
      toast.error("No Such User found!");
      setFilteredConversations([])
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        onChange={(e) => handleSubmit(e.target.value)}
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-yellow-500 text-white">
        <FiSearch className="w-6 h-6 outline-none" />
      </button>
    </div>
  );
};

export default SearchInput;
