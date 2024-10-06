import { create, remove, save } from './repository.js'

export const createUser = async (user) => {
	const { id, username, email } = await create(user)
	return { id, username, email }
}

export const updateUser = async (id, user) => {
	const { username, email } = await save(id, user)
	return { id, username, email }
}

export const removeUser = async (id) => {
	return await remove(id)
}
