import express from "express";
import { getNotifications, markNotificationAsRead } from "../controllers/notificationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getNotifications); // Get user notifications
router.put("/:id", authMiddleware, markNotificationAsRead); // Mark notification as read

export default router;