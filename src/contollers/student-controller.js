import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getStudents = async (req, res) => {
	try {
		const students = await prisma.student.findMany();
		res.json(students);
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch students" });
	}
};

export const getStudentById = async (req, res) => {
	try {
		const id = Number(req.params.id);
		const student = await prisma.student.findUnique({ where: { id } });
		if (!student) {
			return res.status(404).json({ error: "Student not found" });
		}
		res.json(student);
	} catch (err) {
		res.status(404).json({ error: "Student not found" });
	}
};

export const createStudent = async (req, res) => {
	try {
		const { name, surname, email, age } = req.body;
		if (!name || !surname || !email || !age) {
			return res.status(400).json({ error: "Name and email are required" });
		}
		const student = await prisma.student.create({
			data: { name, surname, email, age },
		});
		res.json(student);
	} catch (err) {
		if (err.code === "P2002") {
			return res
				.status(400)
				.json({ error: "A student with the same email already exists" });
		}
		res.status(500).json({ error: "Failed to create student" });
	}
};

export const updateStudent = async (req, res) => {
	try {
		const { name, surname, email, age } = req.body;
		if (!name && !surname && !email && !age) {
			return res
				.status(400)
				.json({ error: "At least one field must be updated" });
		}
		const updatedStudent = await prisma.student.update({
			where: { id: req.params.id },
			data: { name, surname, email, age },
		});
		res.json(updatedStudent);
	} catch (err) {
		console.log(err);
		if (err.code === "P2025") {
			return res.status(400).json({ error: "Student not found" });
		}
		res.status(500).json({ error: "Failed to update student" });
	}
};

export const deleteStudent = async (req, res) => {
	try {
		await prisma.student.delete({
			where: { id: req.params.id },
		});
		res.json({ message: "Student deleted successfully" });
	} catch (err) {
		if (err.code === "P2025") {
			return res.status(404).json({ error: "Student not found" });
		}
		console.error("Error deleting student:", err);
		res.status(500).json({ error: "Failed to delete student" });
	}
};
