import { hash, verify } from "argon2";
export const isValidEmail = (email) => {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const hashPassword = async (password) => {
	return await hash(password);
};

export const verifyPassword = async (hash, password) => {
	return await verify(hash, password);
};
