import { hashPassword, isValidEmail } from '../../utils/index.js'
import { create, findByEmail, remove, save } from './repository.js'

export const createUser = async (user) => {
	if (!user.username || !user.password || !user.email) {
		throw new Error('Username, password and email are required')
	}
	const userExists = await findByEmail(user.email)
	if (userExists) {
		throw new Error('User already exists')
	}
	if (!isValidEmail(user.email)) {
		throw new Error('Invalid email format')
	}
	const hashedPassword = await hashPassword(user.password)
	const { id, username, email } = await create({
		...user,
		password: hashedPassword,
	})
	return { id, username, email }
}

export const updateUser = async (id, user) => {
	const userExists = await findByEmail(user.email)
	if (!userExists || !id) {
		throw new Error('Unauthenticated user')
	}
	if (user.password) {
		const hashedPassword = await hashPassword(user.password)
		user.password = hashedPassword
	}
	const { username, email } = await save(id, user)
	return { id, username, email }
}

export const removeUser = async (id, email) => {
	const userExists = await findByEmail(email)
	if (!userExists || !id) {
		throw new Error('Unauthenticated user')
	}
	return await remove(id)
}
