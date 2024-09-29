import express from "express";
import studentRoutes from "./src/student/routes.js";
import userRoutes from "./src/user/routes.js";

const app = express();

app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);

export default app;
