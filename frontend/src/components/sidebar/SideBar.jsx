import SearchInput from "./SearchInput"
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import useGetConversation from "../../hooks/useGetConversation";

const SideBar = () => {
  const { loading, conversations, filteredConversations, setFilteredConversations  } = useGetConversation();

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
        <SearchInput conversations={conversations} setFilteredConversations={setFilteredConversations}/>
        <div className="divider px-3"></div>
        <Conversations  filteredConversations={filteredConversations} loading={loading} /> 
        <LogoutButton />
    </div>
  )
}

export default SideBar;