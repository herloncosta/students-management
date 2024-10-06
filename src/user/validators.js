import Joi from 'joi'

export const createSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	email: Joi.string().email().required(),
	imageUrl: Joi.string().required(),
})

export const updateSchema = Joi.object({
	username: Joi.string(),
	password: Joi.string(),
	email: Joi.string().email(),
	imageUrl: Joi.string(),
})

export const removeSchema = Joi.object({
	id: Joi.string().required(),
	email: Joi.string().email().required(),
})
