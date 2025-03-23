import { Router } from 'express'
import { getMessage, sendMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';


const messageRouter = Router();

messageRouter.get("/:id", protectRoute, getMessage);
messageRouter.post("/send/:id", protectRoute, sendMessage);

export default messageRouter;