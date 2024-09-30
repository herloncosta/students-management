import { createUser, removeUser, updateUser } from "./service.js";

export const store = async (req, res) => {
	try {
		const user = await createUser(req.body);
		res.status(201).json({ user, message: "User created successfully" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export const update = async (req, res) => {
	try {
		const updatedUser = await updateUser(req.user.id, req.body);
		res.status(200).json({ updatedUser, message: "User updated successfully" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export const destroy = async (req, res) => {
	try {
		await removeUser(req.user.id, req.user.email);
		req.user = null;
		res.status(204).json(null);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
