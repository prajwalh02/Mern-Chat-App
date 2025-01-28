import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js";

// Controller to handle sending messages
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body; // Extract message from request body
        const { id: receiverId } = req.params; // Extract receiver ID from route parameters
        const senderId = req.user._id; // Extract sender ID from authenticated user

        // Step 1: Check if a conversation between the sender and receiver already exists
        let conversation = await Conversation.findOne({
            participants: { $all: [ senderId, receiverId ]}  // Look for a conversation where both sender and receiver are participants
        })

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        })

        if(newMessage) {
            conversation.message.push(newMessage._id);
            await conversation.save();
            return res.status(201).json(newMessage);
        }

        return res.status(400).json({message:"Error creating message"})
        
    } catch (error) {
        console.log("Error in sendMessage Controller: ", error.message);
        return res.status(500).json({ 
            message: "Internal Server Error" 
        });
        
    }
}