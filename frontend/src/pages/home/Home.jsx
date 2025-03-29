import MessageContainer from "../../components/messages/MessageContainer"
import SideBar from "../../components/sidebar/SideBar"
import { useAuthContext } from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Home = () => {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(!authUser) return navigate("/login");
  }, [authUser, navigate]);

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
     {authUser && (
      <>
      <SideBar/>
      <MessageContainer />
      </>
     )}
    </div>
  )
}

export default Home