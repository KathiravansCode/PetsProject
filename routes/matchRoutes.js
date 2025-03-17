import express from "express";
import { findMatches } from "../controllers/matchController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:petId", authMiddleware, findMatches); // Get matching pets

export default router;
