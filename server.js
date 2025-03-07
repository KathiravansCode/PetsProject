import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import petRoutes from "./routes/petRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Serve uploaded images as static files
app.use("/uploads", express.static(path.resolve("uploads")));

// Routes
app.use("/api/auth", authRoutes); // User authentication routes
app.use("/api/pets", petRoutes); // Pet reporting routes

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
