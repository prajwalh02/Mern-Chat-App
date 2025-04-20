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

        const newMessage = await Message ({
            senderId,
            receiverId,
            message,
        })

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        } 

        // TODO: socket IO functionality will go here
 
        await Promise.all([ conversation.save(), newMessage.save() ]);
        
        return res.status(201).json(newMessage);
        
    } catch (error) {
        console.log("Error in sendMessage Controller: ", error.message);
        return res.status(500).json({ 
            message: "Internal Server Error" 
        });
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
        
        const conversation = await Conversation.findOne({
            participants: { $all: [ senderId, userToChatId ]},
        }).populate("messages");   // not only the id but the whole message object is populated

        if(!conversation) {
            return res.status(200).json([]);
        }
        
        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessage Controller: ", error.message);
        return res.status(500).json({ 
            message: "Internal Server Error" 
        });
    }
}


