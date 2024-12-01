import express from "express";
import { login, logout, userSignup } from "../controllers/authController.js";
import validatJwt from "../middleware/validateJwt.js";

const authRouter = express.Router();

authRouter.post("/signup", userSignup);

authRouter.post("/login", login);

authRouter.post("/logout", validatJwt, logout);

export default authRouter;