'use client'

import { refreshToken } from '@/lib/auth'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
export default function HomePage() {
	const [students, setStudents] = useState([])
	const router = useRouter()

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await axios.get('/students')
				const { data } = response.data
				setStudents(data)
			} catch (error) {
				if (error.response.status === 401) {
					try {
						await refreshToken()
						const response = await axios.get('/students')
						const { data } = response.data
						setStudents(data)
					} catch (error) {
						router.push('/')
					}
				} else {
					console.log('Access error', error.response.data.message)
				}
			}
		}

		fetchStudents()
	}, [router])

	return (
		<div className="p-10">
			<h1>HomePage</h1>
			<h2 className="p-2 bg-slate-400">students</h2>

			<section className="flex gap-2 pt-2">
				{students.map((student) => (
					<div className="bg-slate-600 p-6" key={student.id}>
						<h2>Name: {student.name}</h2>
						<p>Surname: {student.surname}</p>
						<p>Email: {student.email}</p>
						<p>Age: {student.age}</p>
					</div>
				))}
			</section>
		</div>
	)
}
