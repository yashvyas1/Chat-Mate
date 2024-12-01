import express from 'express';
import validatJwt from '../middleware/validateJwt.js';
import { getUsers, updateUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/get', validatJwt, getUsers);
userRouter.patch('/update', validatJwt, updateUser);

export default userRouter;