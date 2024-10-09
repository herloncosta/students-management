'use client'

import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()

	const handleLogin = async (e) => {
		e.preventDefault()

		console.log(email, password)

		try {
			const response = await axios.post('/users/auth/signin', {
				email,
				password,
			})
			console.log(response.data)
			router.push('/home')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<main className="h-full flex">
			<section className="h-full">
				<div>
					<h1>Que bom te ver novamente!</h1>
					<p>Acesse sua conta abaixo.</p>
				</div>

				{/* botão do google - autenticação com oauth e passport */}

				<form>
					<div className="max-w-[400px]">
						<label htmlFor="user-email">Email:</label>
						<input
							id="user-email"
							type="email"
							placeholder="Digite seu email"
							className="w-full text-slate-950"
							autoComplete="on"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="max-w-[400px]">
						<label htmlFor="user-password">Senha:</label>
						<input
							id="user-password"
							type="password"
							placeholder="Digite sua senha"
							className="w-full text-slate-950"
							autoComplete="off"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button type="submit" onClick={handleLogin}>
						Entrar
					</button>
				</form>
			</section>

			<section className="h-full bg-slate-700">{/* <Image /> */}</section>
		</main>
	)
}
