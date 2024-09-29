import { Router } from "express";
import { destroy, index, show, store, update } from "./controller.js";

const userRoutes = Router();

userRoutes.get("/", index);
userRoutes.get("/:id", show);
userRoutes.post("/", store);
userRoutes.put("/:id", update);
userRoutes.delete("/:id", destroy);

export default userRoutes;
