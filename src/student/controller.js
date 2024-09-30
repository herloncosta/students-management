import Joi from "joi";

import { HttpStatusCode } from "../../utils/http-status-codes.js";
import {
	createStudent,
	deleteStudent,
	getStudentById,
	getStudents,
	updateStudent,
} from "./service.js";

export const index = async (req, res) => {
	try {
		const students = await getStudents();
		res.status(HttpStatusCode.OK.code).json(students);
	} catch (err) {
		res
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR.code)
			.json({ error: HttpStatusCode.INTERNAL_SERVER_ERROR.message });
	}
};

const showSchema = Joi.object().keys({
	id: Joi.string().required(),
});

export const show = async (req, res) => {
	try {
		const { error, value } = showSchema.validate(req.params);
		if (error) {
			return res
				.status(HttpStatusCode.BAD_REQUEST.code)
				.json({ error: error.details[0].message });
		}

		const student = await getStudentById(value.id);

		if (!student) {
			return res
				.status(HttpStatusCode.NOT_FOUND.code)
				.json({ error: HttpStatusCode.NOT_FOUND.message });
		}

		res.json(student);
	} catch (e) {
		res
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR.code)
			.json({ error: HttpStatusCode.INTERNAL_SERVER_ERROR.message });
	}
};

const createSchema = Joi.object().keys({
	name: Joi.string().required(),
	surname: Joi.string().required(),
	email: Joi.string().email().required(),
	age: Joi.number().integer().min(18).max(100).required(),
});

export const create = async (req, res) => {
	try {
		const { error, value } = createSchema.validate(req.body);

		if (error) {
			return res
				.status(HttpStatusCode.BAD_REQUEST.code)
				.json({ error: error.details[0].message });
		}

		const student = await createStudent(value);

		if (!student) {
			return res
				.status(HttpStatusCode.BAD_REQUEST.code)
				.json({ error: error.details[0].message });
		}

		res.json(student);
	} catch (err) {
		console.log(err);
		res
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR.code)
			.json({ error: HttpStatusCode.INTERNAL_SERVER_ERROR.message });
	}
};

const updateSchema = Joi.object().keys({
	id: Joi.string().required(),
	name: Joi.string(),
	surname: Joi.string(),
	email: Joi.string().email(),
	age: Joi.number().integer().min(18).max(100),
});

export const update = async (req, res) => {
	try {
		const { error, value } = updateSchema.validate({
			...req.params,
			...req.body,
		});

		if (error) {
			return res
				.status(HttpStatusCode.BAD_REQUEST.code)
				.json({ error: error.details[0].message });
		}

		const updatedStudent = await updateStudent(value);

		if (!updatedStudent) {
			return res
				.status(HttpStatusCode.NOT_FOUND.code)
				.json({ error: HttpStatusCode.NOT_FOUND.message });
		}

		res.json(updatedStudent);
	} catch (err) {
		console.log(err);
		res
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR.code)
			.json({ error: HttpStatusCode.INTERNAL_SERVER_ERROR.message });
	}
};

const destroySchema = Joi.object().keys({
	id: Joi.string().required(),
});

export const destroy = async (req, res) => {
	try {
		const { error, value } = destroySchema.validate(req.params);
		if (error) {
			return res
				.status(HttpStatusCode.BAD_REQUEST.code)
				.json({ error: error.details[0].message });
		}

		await deleteStudent(value);
		res.status(HttpStatusCode.NO_CONTENT.code).json({});
	} catch (err) {
		res
			.status(HttpStatusCode.INTERNAL_SERVER_ERROR.code)
			.json({ error: HttpStatusCode.INTERNAL_SERVER_ERROR.message });
	}
};
