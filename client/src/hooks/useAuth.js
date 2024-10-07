import axios from 'axios'
import { useState } from 'react'

export const useAuth = () => {
	const [user, setUser] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const login = async (email, password) => {
		try {
			const response = await axios.post(
				'http://localhost:4000/api/users/auth/signin',
				{
					email,
					password,
				},
			)
			const token = response.data.token
			localStorage.setItem('token', token)
			setUser(response.data.user)
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	const logout = async () => {
		localStorage.removeItem('token')
		setUser(null)
	}

	return {
		user,
		error,
		loading,
		login,
		logout,
	}
}
