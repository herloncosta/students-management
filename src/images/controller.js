import { createImageUpload } from './service.js'

/**
 * Handles the creation of a new image upload.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.user - The authenticated user object.
 * @param {File} req.file - The uploaded image file.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<Object>} - A JSON response with the uploaded image URL or an error message.
 */
export const create = async (req, res) => {
	if (!req.file) {
		return res.status(400).json({ message: 'No image uploaded' })
	}
	try {
		const newImageUrl = await createImageUpload(req.user.id, req.file.path)
		return res.status(200).json({
			message: 'Image uploaded successfully',
			imageUrl: newImageUrl,
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'Error uploading image' })
	}
}
