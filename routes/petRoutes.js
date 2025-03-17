import express from "express";
import { createPet, getPets, getPetById, updatePet, deletePet } from "../controllers/petController.js";
import upload from "../middleware/uploadMiddleware.js"; // Multer for image uploads
import authMiddleware from "../middleware/authMiddleware.js"; // Authentication

const router = express.Router();

router.post("/", authMiddleware, upload.array("images", 5), createPet); // Upload up to 5 images
router.get("/", getPets);
router.get("/:id", getPetById);
router.put("/:id", authMiddleware, updatePet);
router.delete("/:id", authMiddleware, deletePet);

export default router;