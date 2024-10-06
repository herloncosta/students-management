import { hash, verify } from 'argon2'
export const hashPassword = async (password) => {
	return await hash(password)
}

export const verifyPassword = async (hash, password) => {
	return await verify(hash, password)
}

export const sendResponse = (res, statusCode, message, data) => {
	res
		.status(statusCode)
		.json({ success: statusCode >= 200 && statusCode < 300, message, data })
}
