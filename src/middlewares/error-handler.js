/**
 * Middleware function to handle errors in the application.
 *
 * This middleware function is responsible for handling errors that occur in the application. It checks if the error is an instance of a `multer.MulterError`, and if so, it returns a 400 Bad Request response with the error message. Otherwise, it returns a response with the status code from the error (or 500 Internal Server Error if no status code is provided) and the error message (or a generic "Internal server error" message if no error message is provided).
 *
 * @param {Error} error - The error object that was thrown.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 */
export const errorHandler = (error, req, res, next) => {
	if (error instanceof multer.MulterError) {
		res.status(400).json({ error: error.message })
	}
	res
		.status(error.status || 500)
		.json({ error: error.message || 'Internal server error' })
}
