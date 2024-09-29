import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.json(users);
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch users" });
	}
};

export const getUserById = async (req, res) => {
	try {
		const id = req.params.id;
		const user = await prisma.user.findUnique({ where: { id } });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json(user);
	} catch (err) {
		res.status(404).json({ error: "User not found" });
	}
};

export const createUser = async (req, res) => {
	try {
		const { username, password, email } = req.body;
		if (!username || !password || !email) {
			return res
				.status(400)
				.json({ error: "Username, password and email are required" });
		}
		const user = await prisma.user.create({
			data: { username, password, email },
		});
		res.json(user);
	} catch (err) {
		if (err.code === "P2002") {
			return res
				.status(400)
				.json({ error: "A user with the same email already exists" });
		}
		res.status(500).json({ error: "Failed to create user" });
	}
};

export const updateUser = async (req, res) => {
	try {
		const { username, password, email } = req.body;
		if (!username && !password && !email) {
			return res
				.status(400)
				.json({ error: "At least one field must be updated" });
		}
		const updatedUser = await prisma.user.update({
			where: { id: req.params.id },
			data: { username, password, email },
		});
		res.json(updatedUser);
	} catch (err) {
		console.log(err);
		if (err.code === "P2025") {
			return res.status(400).json({ error: "User not found" });
		}
		res.status(500).json({ error: "Failed to update user" });
	}
};

export const deleteUser = async (req, res) => {
	try {
		await prisma.user.delete({
			where: { id: req.params.id },
		});
		res.json({ message: "User deleted successfully" });
	} catch (err) {
		if (err.code === "P2025") {
			return res.status(404).json({ error: "User not found" });
		}
		res.status(500).json({ error: "Failed to delete user" });
	}
};
