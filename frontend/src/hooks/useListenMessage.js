import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/notification_sound.mp3"

const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {

    // Listen for "newMessage" event from the server
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound =  new Audio(notificationSound);
      sound.play();

      // Add the new message to the existing messages list
      setMessages([...messages, newMessage]);
    });

    // Cleanup: remove the listener when the component using this hook unmounts or dependencies change
    return () => socket?.off("newMessage");
        
  }, [socket, messages, setMessages]);
};

export default useListenMessage;
