import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

/**
 * Updates the image URL for the user with the specified ID.
 *
 * @param {string} userId - The ID of the user whose image URL should be updated.
 * @param {string} imagePath - The new image path to be set for the user.
 * @returns {Promise<void>} - A Promise that resolves when the update is complete.
 */

export const updateUserImageUrl = async (userId, imagePath) => {
	await prisma.user.update({
		where: { id: userId },
		data: { imageUrl: imagePath },
	})
}
