import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/authRoutes.js';
import connectDB from './db/connectDB.js';
import cors from 'cors'
import messageRouter from './routes/messageRoutes.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';
import { app, server } from './socket/socket.js';
dotenv.config();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // Explicitly specify your frontend origin
    credentials: true, // Allow credentials (cookies)
}));
app.use(cookieParser())
const PORT = process.env.PORT || 8000;

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/user", userRouter);

server.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port 8000');
})
