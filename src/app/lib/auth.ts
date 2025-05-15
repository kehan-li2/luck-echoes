import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const generateToken = (user: { id: string; email: string }) => {
	return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
		expiresIn: "1w",
	});
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, JWT_SECRET);
};
