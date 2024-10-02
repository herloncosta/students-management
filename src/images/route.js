import { Router } from 'express'

import { authenticate } from '../middlewares/auth.js'
import { create } from './controller.js'
import { upload } from './multer-config.js'

export const imagesRouter = Router()

imagesRouter.post('/upload', authenticate, upload.single('image'), create)
