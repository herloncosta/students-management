import { updateUserImageUrl } from './repository.js'

/**
 * Uploads an image for a user and updates the user's image URL.
 *
 * @param {string} userId - The ID of the user to upload the image for.
 * @param {string} imagePath - The path to the image file to upload.
 * @returns {Promise<string>} - The uploaded image path.
 * @throws {Error} - If there is an error uploading the image.
 */

export const createImageUpload = async (userId, imagePath) => {
	try {
		await updateUserImageUrl(userId, imagePath)
		return imagePath
	} catch (error) {
		throw new Error('Error uploading image')
	}
}
