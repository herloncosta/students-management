import { isValidEmail } from "../../utils/index.js";
import {
	create,
	findAll,
	findByEmail,
	findById,
	remove,
	save,
} from "./repository.js";

export const getAllUsers = async () => {
	return await findAll();
};

export const getUserById = async (id) => {
	const user = await findById(id);
	if (!user) {
		throw new Error("User not found");
	}
	return user;
};

export const createUser = async (user) => {
	const userExists = await findByEmail(user.email);
	if (userExists) {
		throw new Error("User already exists");
	}
	if (!user.username || !user.password || !user.email) {
		throw new Error("Username, password and email are required");
	}
	if (!isValidEmail(user.email)) {
		throw new Error("Invalid email format");
	}
	return await create(user);
};

export const updateUser = async (id, user) => {
	const userExists = await findById(id);
	if (!userExists) {
		throw new Error("User not found");
	}
	return await save(id, user);
};

export const removeUser = async (id, user) => {
	const userExists = await findById(id);
	if (!userExists) {
		throw new Error("User not found");
	}
	return await remove(id);
};
