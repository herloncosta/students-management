import axios from '@/lib/axios'

export const refreshToken = async () => {
	try {
		const response = await axios.post('/users/auth/refresh-token')
		return response.data.message
	} catch (error) {
		console.error('Refresh token error:', error.response.data.message)
		throw error
	}
}
