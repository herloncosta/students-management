import { Router } from 'express'
import { authenticate, login } from '../middlewares/auth.js'
import { destroy, store, update } from './controller.js'

export const userRoutes = Router()

userRoutes.post('/auth/signin', store)
userRoutes.put('/', authenticate, update)
userRoutes.delete('/', authenticate, destroy)
userRoutes.post('/auth/login', login)
