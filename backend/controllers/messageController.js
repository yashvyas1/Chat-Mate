import asyncHandler from 'express-async-handler';
import Chat from '../models/Chat.js';
import Message from '../models/Message.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

const sendMessage = asyncHandler(async (req, res) => {
    try {
    const { messageText } = req.body;
    const { id: receiverId } = req.params;
	const senderId = req.user._id;
    const senderName = req.user.fullName;

    let chat = await Chat.findOne({
        participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
        chat = await Chat.create({
            participants: [senderId, receiverId],
        });
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        message: messageText,
    });

    if (newMessage) {
        chat.messages.push(newMessage._id);
    }
    await Promise.all([chat.save(), newMessage.save()]);
    
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        // Format the time to HH:MM AM/PM
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString("en-US", {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        const notificationMessage = {
            notification: `${senderName} sent you a new message`,
            sender: senderId,
            senderName: senderName,
            message: messageText,
            time: formattedTime,
        };

        io.to(receiverSocketId).emit('newMessage', newMessage);
        io.to(receiverSocketId).emit('newNotification', notificationMessage);
    }

    res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sending message: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
})


const getMessage = asyncHandler(async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const chat = await Chat.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!chat) return res.status(200).json([]);

		const messages = chat.messages;

		res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getting message: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
})

export {sendMessage, getMessage}