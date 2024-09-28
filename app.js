import express from "express";
import studentRoutes from "./src/routes/student-routes.js";
import teacherRoutes from "./src/routes/teacher-routes.js";

const app = express();

app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);

export default app;
