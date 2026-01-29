import { Router } from "express";
import { getRoles } from "../controllers/RoleController.js";

const router = Router();

router.get("/", getRoles);

export default router;