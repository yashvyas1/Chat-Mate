import asyncHandler from 'express-async-handler'
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import { io } from '../socket/socket.js';

const userSignup = asyncHandler(async (req, res) => {
    try {
		const { fullName, email, password, confirmPassword, gender } = req.body;

		if(!fullName || !email || !password || !confirmPassword || !gender){
			return res.status(400).json({ message: "Please fill in all fields" });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ error: "Email already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// https://avatar-placeholder.iran.liara.run/

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${email}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${email}`;

		const newUser = new User({
			fullName,
			email,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		if (newUser) {
			await newUser.save();
			const notificationMessage = {
                notification: `New user ${fullName} has joined! Say Hello`,
                sender: "System", // Set sender as "System" or any identifier
                senderName: "Chat Mate",
                message: `${fullName} registered successfully.`,
                time: new Date().toLocaleTimeString("en-US", {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                }),
            };
            io.emit('newNotification', notificationMessage);
			res.status(201).json({
                message: 'User Registered Successfully!',
				_id: newUser._id,
				fullName: newUser.fullName,
				email: newUser.email,
				gender:gender,
				bio: user.bio,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
})

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if(!email || !password){
			return res.status(400).json({ error: "Email and password are required" });
		}
		const user = await User.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		const token = await generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			message: 'login successfully',
			token: token,
			_id: user._id,
			fullName: user.fullName,
			email: user.email,
			gender:user.gender,
			bio: user.bio,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const logout = (req, res) => {
	try {
		// res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export {userSignup, logout, login}