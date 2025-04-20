import { create } from "zustand"

// Create a Zustand store to manage conversation-related state
const useConversation = create((set) => ({
    // Holds the currently selected conversation; null means no conversation is selected
    selectedConversation: null,

    // Function to update the selected conversation
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

    // Array to store messages of the selected conversation
    messages: [],

    // Function to update the messages array
    setMessages: (messages) => set({ messages }),
}))

export default useConversation
