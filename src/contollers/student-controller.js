import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getStudents = async (req, res) => {
	const students = await prisma.students.findMany();
	res.json(students);
};

// export const getStudentById = (req, res) => {
// 	res.json({ student: {} });
// };

export const createStudent = async (req, res) => {
	try {
		const { name, email } = req.body;
		const student = await prisma.students.create({
			data: { name, email },
		});
		res.json(student);
	} catch (err) {
		console.error("Error creating student:", err);
		res.status(500).json({ error: "Failed to create student" });
	}
};

// export const updateStudent = (req, res) => {
// 	res.json({ student: {} });
// };

// export const deleteStudent = (req, res) => {
// 	res.json({ student: {} });
// };
