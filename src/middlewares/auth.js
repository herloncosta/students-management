import jwt from 'jsonwebtoken'
import { sendResponse, verifyPassword } from '../../utils/index.js'
import { findByEmail } from '../user/repository.js'

/**
 * Logs in a user by verifying their email and password, and then generating and setting authentication tokens.
 *
 * @param {Object} req - The Express request object containing the user's email and password in the request body.
 * @param {Object} res - The Express response object to send the login response.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
export const login = async (req, res) => {
	const { email, password } = req.body
	const user = await findByEmail(email)
	if (!user || !(await verifyPassword(user.password, password))) {
		return sendResponse(res, 401, 'Invalid credentials', null)
	}

	const payload = { id: user.id, username: user.username, email: user.email }
	const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
		expiresIn: '15m',
	})
	const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
		expiresIn: '7d',
	})

	res.cookie('token', token, {
		httpOnly: true,
		// secure: true, // Only send cookies over HTTPS
		sameSite: 'Strict',
		maxAge: 15 * 60 * 1000, // 15 minutes
	})

	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		// TODO: enable this when deploying to production
		// secure: true, // Only send cookies over HTTPS
		sameSite: 'Strict',
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	})

	return sendResponse(res, 200, 'Login successful', null)
}

/**
 * Authenticates the user by verifying the provided token.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function to be executed.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent or the next middleware is called.
 */
export const authenticate = async (req, res, next) => {
	const token = req.cookies.token
	if (!token) {
		return sendResponse(res, 401, 'No token provided', null)
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
		req.user = decoded
		next()
	} catch (error) {
		return sendResponse(res, 401, 'Invalid token', null)
	}
}

/**
 * Refreshes the user's authentication token by verifying the provided refresh token.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
export const refreshToken = async (req, res) => {
	const refreshToken = req.cookies.refreshToken
	if (!refreshToken) {
		return sendResponse(res, 401, 'No refresh token provided', null)
	}
	try {
		const { id, username, email } = jwt.verify(
			refreshToken,
			process.env.JWT_SECRET_KEY,
		)
		const payload = { id, username, email }
		const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
			expiresIn: '15m',
		})
		res.cookie('token', token, {
			httpOnly: true,
			// TODO: enable this when deploying to production
			// secure: true, // Only send cookies over HTTPS
			sameSite: 'Strict',
			maxAge: 15 * 60 * 1000, // 15 minutes
		})

		return sendResponse(res, 200, 'Token refreshed successfully', null)
	} catch (error) {
		return sendResponse(res, 401, 'Invalid refresh token', null)
	}
}
