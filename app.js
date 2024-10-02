import cors from 'cors'
import express from 'express'

import { imagesRouter } from './src/images/route.js'
import { studentRoutes } from './src/student/routes.js'
import { userRoutes } from './src/user/routes.js'

const app = express()

app.use(express.json())
app.use(cors())

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
