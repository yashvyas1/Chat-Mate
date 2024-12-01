import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});

	res.cookie("token", token, {
		maxAge: 30 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "lax", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV === "production",
	});

	return token;
};

export default generateTokenAndSetCookie;