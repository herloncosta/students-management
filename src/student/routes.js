import { Router } from "express";
import { create, destroy, index, show, update } from "./controller.js";

const studentRoutes = Router();

studentRoutes.get("/", index);
studentRoutes.get("/:id", show);
studentRoutes.post("/", create);
studentRoutes.put("/:id", update);
studentRoutes.delete("/:id", destroy);

export default studentRoutes;
