'use client'

import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Home() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { login, user } = useAuth()

	const router = useRouter()

	const debounce = (func, delay) => {
		let timer
		return function (...args) {
			clearTimeout(timer)
			timer = setTimeout(() => {
				func.apply(this, args)
			}, delay)
		}
	}

	const handleEmailChange = (event) => {
		setEmail(event.target.value)
	}

	const handlePasswordChange = (event) => {
		setPassword(event.target.value)
	}

	const handleLogin = async (e) => {
		e.preventDefault()
		await login(email, password)
	}

	useEffect(() => {
		if (user) {
			router.push('/homepage')
		}
	}, [user, router])

	return (
		<main className="h-full flex">
			<section className="h-full">
				<div>
					<h1>Que bom te ver novamente!</h1>
					<p>Acesse sua conta abaixo.</p>
				</div>

				{/* botão do google - autenticação com oauth e passport */}

				<div>
					<div className="max-w-[400px]">
						<label htmlFor="user-email">Email:</label>
						<input
							id="user-email"
							type="email"
							placeholder="Digite seu email"
							onChange={(event) => handleEmailChange(event)}
							className="w-full"
						/>
					</div>

					<div className="max-w-[400px]">
						<label htmlFor="user-password">Senha:</label>
						<input
							id="user-password"
							type="password"
							placeholder="Digite sua senha"
							onChange={debounce(handlePasswordChange, 500)}
							className="w-full"
						/>
					</div>

					<button type="submit" onClick={handleLogin}>
						Entrar
					</button>
				</div>
			</section>

			<section className="h-full bg-slate-700">{/* <Image /> */}</section>
		</main>
	)
}
