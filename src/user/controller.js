import {
	createUser,
	getAllUsers,
	getUserById,
	removeUser,
	updateUser,
} from "./service.js";

export const index = async (req, res, next) => {
	try {
		const users = await getAllUsers();
		res.status(200).json(users);
	} catch (err) {
		next(err);
	}
};

export const show = async (req, res) => {
	try {
		const id = req.params.id;
		const user = await getUserById(id);
		res.status(200).json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

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
		const updatedUser = await updateUser(req.params.id, req.body);
		res.status(200).json({ updatedUser, message: "User updated successfully" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export const destroy = async (req, res) => {
	try {
		const removedUser = await removeUser(req.params.id);
		res.status(200).json({ removedUser, message: "User deleted successfully" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
