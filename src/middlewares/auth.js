import jwt from "jsonwebtoken";
import { verifyPassword } from "../../utils/index.js";
import { findByEmail } from "../user/repository.js";

export const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await findByEmail(email);
	if (!user || !(await verifyPassword(user.password, password))) {
		return res.status(401).json({ error: "Invalid credentials" });
	}
	const payload = { id: user.id, username: user.username, email: user.email };
	const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
		expiresIn: "1h",
	});
	return res.json({ token });
};

export const authenticate = async (req, res, next) => {
	const [_, token] = req.headers.authorization.split(" ");
	if (!token) {
		return res.status(401).json({ error: "No token provided" });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ error: "Invalid token" });
	}
};
