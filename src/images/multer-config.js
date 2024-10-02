import multer from 'multer'

/**
 * Configures the Multer storage settings for uploading files to the server.
 *
 * The `destination` function specifies that the uploaded files should be stored in the `/uploads` directory.
 * The `filename` function generates a unique filename for each uploaded file by combining the current timestamp and the original filename.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} file - The uploaded file object.
 * @param {Function} cb - The callback function to indicate the result of the file storage configuration.
 */
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '/uploads')
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`)
	},
})

/**
 * Middleware function to filter uploaded files based on their MIME type.
 * Only allows JPEG and PNG image files to be uploaded.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} file - The uploaded file object.
 * @param {Function} cb - The callback function to indicate the result of the file filter.
 */
const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg'
	) {
		return cb(null, true)
	}

	return cb(
		new Error('Invalid file type, only JPEG and PNG is allowed!'),
		false,
	)
}

/**
 * Configures the Multer middleware for handling file uploads.
 *
 * The `upload` middleware is configured with the following options:
 * - `storage`: Specifies the storage settings for uploaded files, including the destination directory and a unique filename generator.
 * - `fileFilter`: Filters the uploaded files based on their MIME type, only allowing JPEG and PNG image files.
 * - `limits`: Sets the maximum file size limit to 5MB.
 *
 * This middleware can be used in route handlers to handle file uploads in the application.
 */
export const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
})
