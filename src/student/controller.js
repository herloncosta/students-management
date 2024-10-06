import { sendResponse } from '../../utils/index.js'
import { findByEmail } from './repository.js'
import {
	createStudent,
	deleteStudent,
	getStudentById,
	getStudents,
	updateStudent,
} from './service.js'
import {
	createSchema,
	destroySchema,
	showSchema,
	updateSchema,
} from './validators.js'

export const index = async (req, res) => {
	try {
		const students = await getStudents()
		return sendResponse(res, 200, 'Students fetched successfully', students)
	} catch (err) {
		return sendResponse(res, 500, 'Internal server error', null)
	}
}

export const show = async (req, res) => {
	try {
		const { error, value } = showSchema.validate(req.params)
		if (error) {
			return sendResponse(res, 400, error.details[0].message, null)
		}

		const student = await getStudentById(value.id)
		if (!student) {
			return sendResponse(res, 404, 'Student not found', null)
		}

		return sendResponse(res, 200, 'Student fetched successfully', student)
	} catch (error) {
		return sendResponse(res, 500, 'Internal server error', null)
	}
}

export const create = async (req, res) => {
	try {
		const { error, value } = createSchema.validate(req.body)
		if (error) {
			return sendResponse(res, 400, error.details[0].message, null)
		}

		const studentExists = await findByEmail(value.email)
		if (studentExists) {
			return sendResponse(res, 400, 'Student already exists', null)
		}

		const student = await createStudent(value)
		return sendResponse(res, 200, 'Student created successfully', student)
	} catch (error) {
		return sendResponse(res, 500, 'Internal server error', null)
	}
}

export const update = async (req, res) => {
	try {
		const { id } = req.params
		const { name, surname, email, age } = req.body
		const { error, value } = updateSchema.validate({
			id,
			name,
			surname,
			email,
			age,
		})
		if (error) {
			return sendResponse(res, 400, error.details[0].message, null)
		}

		const student = await getStudentById(value.id)
		if (!student) {
			return sendResponse(res, 404, 'Student not found', null)
		}

		const updatedStudent = await updateStudent(value)
		return sendResponse(
			res,
			200,
			'Student updated successfully',
			updatedStudent,
		)
	} catch (err) {
		return sendResponse(res, 500, 'Internal server error', null)
	}
}

export const destroy = async (req, res) => {
	try {
		const { error, value } = destroySchema.validate(req.params)
		if (error) {
			return sendResponse(res, 400, error.details[0].message, null)
		}

		const student = await getStudentById(value.id)
		if (!student) {
			return sendResponse(res, 404, 'Student not found', null)
		}

		await deleteStudent(value)
		return sendResponse(res, 200, 'Student deleted successfully', null)
	} catch (err) {
		return sendResponse(res, 500, 'Internal server error', null)
	}
}
