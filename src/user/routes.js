import { Router } from "express";
import {
	createUser,
	deleteUser,
	getUserById,
	getUsers,
	updateUser,
} from "./controller.js";

const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUserById);
userRoutes.post("/", createUser);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;
