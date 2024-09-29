import { Router } from "express";
import {
	createStudent,
	deleteStudent,
	getStudentById,
	getStudents,
	updateStudent,
} from "../contollers/student-controller.js";

const studentRoutes = Router();

studentRoutes.get("/", getStudents);
studentRoutes.get("/:id", getStudentById);
studentRoutes.post("/", createStudent);
studentRoutes.put("/:id", updateStudent);
studentRoutes.delete("/:id", deleteStudent);

export default studentRoutes;
