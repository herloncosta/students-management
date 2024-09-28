import { Router } from "express";
import {
	createStudent,
	getStudents,
} from "../contollers/student-controller.js";

const studentRoutes = Router();

studentRoutes.get("/", getStudents);

studentRoutes.get("/:id", (req, res) => {
	res.json({ student: {} });
});

studentRoutes.post("/", createStudent);

studentRoutes.put("/:id", (req, res) => {
	res.json({ student: {} });
});

studentRoutes.delete("/:id", (req, res) => {
	res.json({ student: {} });
});

export default studentRoutes;
