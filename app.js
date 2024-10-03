import cors from 'cors'
import express from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import multer from 'multer'

import { imagesRouter } from './src/images/route.js'
import { studentRoutes } from './src/student/routes.js'
import { userRoutes } from './src/user/routes.js'

const app = express()

/**
 * Configures a rate limiter middleware for the Express application.
 * This middleware limits the number of requests that can be made from a single IP address within a 15-minute window to 100 requests.
 * The rate limit information is returned in the `RateLimit-*` headers, and the `X-RateLimit-*` headers are disabled.
 */
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
})

app.use(express.json())
app.use(cors())
app.use(limiter)
app.use(helmet())

app.use('/api/students', studentRoutes)
app.use('/api/users', userRoutes)
app.use('/api/images', imagesRouter)

/**
 * Middleware function to handle errors that occur during file uploads using the multer middleware.
 *
 * If the error is a `multer.MulterError`, it will return a 400 Bad Request response with the error message.
 * For any other errors, it will return a 500 Internal Server Error response with the error message.
 *
 * @param {Error} error - The error object that occurred during the file upload.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 */

app.use((error, req, res, next) => {
	if (error instanceof multer.MulterError) {
		res.status(400).json({ error: error.message })
	}
	res.status(500).json({ error: error.message })
	next()
})

export default app
