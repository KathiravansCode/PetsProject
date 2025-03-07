import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import connectDB from "./config/db.js";
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); 
app.use(cors()); 

// Serve uploaded images as static files
app.use("/uploads", express.static(path.resolve("uploads")));

// Routes
app.use("/api/auth", authRoutes); // User authentication routes
app.use("/api/pets", petRoutes); // Pet reporting routes




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
