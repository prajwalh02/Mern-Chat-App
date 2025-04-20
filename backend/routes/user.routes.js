import { Router } from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { getAllUsers, getUserForSidebar } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get("/", protectRoute, getUserForSidebar)

userRouter.get("/all", getAllUsers);

userRouter.post('')

userRouter.post("/cleardb")

export default userRouter;