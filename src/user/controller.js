import { hashPassword, sendResponse } from '../../utils/index.js'
import { findByEmail } from './repository.js'
import { createUser, removeUser, updateUser } from './service.js'
import { createSchema } from './validators.js'

export const store = async (req, res) => {
	try {
		const { error, value } = createSchema.validate(req.body)
		if (error) {
			return sendResponse(res, 400, error.details[0].message, null)
		}

		const userExists = await findByEmail(value.email)
		if (userExists) {
			return sendResponse(res, 400, 'User already exists', null)
		}

		const hashedPassword = await hashPassword(value.password)
		value.password = hashedPassword
		const user = await createUser(value)

		return sendResponse(res, 201, 'User created successfully', user)
	} catch (err) {
		console.error(err)
		sendResponse(res, 500, 'Internal server error', null)
	}
}

export const update = async (req, res) => {
	try {
		const updatedUser = await updateUser(req.user.id, req.body)
		res.status(200).json({ updatedUser, message: 'User updated successfully' })
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}

export const destroy = async (req, res) => {
	try {
		await removeUser(req.user.id, req.user.email)
		req.user = null
		res.status(204).json(null)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}
