import express from "express";
import { getQuestions } from "../controllers/questionController.js";

const router = express.Router();

// GET /api/questions
router.get("/", getQuestions);

export default router;
