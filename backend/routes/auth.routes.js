import { Router } from 'express'
import { loginUser, logoutUser, signupUser } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post("/signup", signupUser)
      .post("/login", loginUser)
      .post("/logout", logoutUser)

export default authRouter;