import { hashPassword, sendResponse } from '../../utils/index.js'
import { findByEmail } from './repository.js'
import { createUser, removeUser, updateUser } from './service.js'
import { createSchema, removeSchema, updateSchema } from './validators.js'

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
		const { error, value } = updateSchema.validate(req.body)
		if (error) {
			return sendResponse(res, 400, error.details[0].message, null)
		}

		const userExists = await findByEmail(value.email)
		if (!userExists) {
			return sendResponse(res, 404, 'User not found', null)
		}

		if (value.password) {
			const hashedPassword = await hashPassword(value.password)
			value.password = hashedPassword
		}

		const updatedUser = await updateUser(req.user.id, req.body)
		return res
			.status(200)
			.json({ updatedUser, message: 'User updated successfully' })
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}

export const destroy = async (req, res) => {
	try {
		const { id, email } = req.user
		console.log(id, email)
		const { error } = removeSchema.validate({ id, email })

		if (error) {
			return sendResponse(res, 400, error.details[0].message, null)
		}

		if (!id) {
			return sendResponse(res, 403, 'Unauthorized', null)
		}

		const userExists = await findByEmail(email)
		if (!userExists) {
			return sendResponse(res, 404, 'User not found', null)
		}

		await removeUser(id)
		req.user = null
		return sendResponse(res, 204, 'User removed successfuly', null)
	} catch (err) {
		sendResponse(res, 500, 'Internal server error', null)
	}
}
