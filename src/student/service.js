import { deleteOne, findAll, findById, insert, save } from './repository.js'

export const getStudents = async () => {
	return await findAll()
}

export const getStudentById = async (id) => {
	return await findById(id)
}

export const createStudent = async (student) => {
	return await insert(student)
}

export const updateStudent = async (student) => {
	return await save(student)
}

export const deleteStudent = async (student) => {
	await deleteOne(student.id)
}
