import { Router } from "express";

const teacherRoutes = Router();

teacherRoutes.get("/", (req, res) => {
	res.json({ professors: [] });
});

teacherRoutes.get("/:id", (req, res) => {
	res.json({ professor: {} });
});

teacherRoutes.post("/", (req, res) => {
	res.json({ professor: {} });
});

teacherRoutes.put("/:id", (req, res) => {
	res.json({ professor: {} });
});

teacherRoutes.delete("/:id", (req, res) => {
	res.json({ professor: {} });
});

export default teacherRoutes;
