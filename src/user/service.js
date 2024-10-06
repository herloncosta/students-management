import { hashPassword } from '../../utils/index.js'
import { create, findByEmail, remove, save } from './repository.js'
import { removeSchema, updateSchema } from './validators.js'

export const createUser = async (user) => {
	const { id, username, email } = await create(user)
	return { id, username, email }
}

export const updateUser = async (id, user) => {
	const { error } = updateSchema.validate(user)
	if (error) {
		throw new Error(error.details[0].message)
	}
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
	const { error } = removeSchema.validate({ id, email })
	if (error) {
		throw new Error(error.details[0].message)
	}
	const userExists = await findByEmail(email)
	if (!userExists || !id) {
		throw new Error('Unauthenticated user')
	}
	return await remove(id)
}
