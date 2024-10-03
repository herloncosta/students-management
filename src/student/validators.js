import Joi from 'joi'

export const showSchema = Joi.object().keys({
	id: Joi.string().required(),
})

export const createSchema = Joi.object().keys({
	name: Joi.string().required(),
	surname: Joi.string().required(),
	email: Joi.string().email().required(),
	age: Joi.number().integer().min(18).max(100).required(),
})

export const updateSchema = Joi.object().keys({
	id: Joi.string().required(),
	name: Joi.string(),
	surname: Joi.string(),
	email: Joi.string().email(),
	age: Joi.number().integer().min(18).max(100),
})

export const destroySchema = Joi.object().keys({
	id: Joi.string().required(),
})
