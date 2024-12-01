import express from 'express'
import { getMessage, sendMessage } from '../controllers/messageController.js';
import validatJwt from '../middleware/validateJwt.js';

const messageRouter = express.Router();

messageRouter.post('/send/:id', validatJwt, sendMessage);
messageRouter.get('/get/:id', validatJwt, getMessage);

export default messageRouter;