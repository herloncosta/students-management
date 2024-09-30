import { Router } from "express";
import { authenticate, login } from "../middlewares/auth.js";
import { destroy, store, update } from "./controller.js";

const userRoutes = Router();

userRoutes.post("/", store);
userRoutes.put("/", authenticate, update);
userRoutes.delete("/", authenticate, destroy);
userRoutes.post("/auth/login", login);

export default userRoutes;
