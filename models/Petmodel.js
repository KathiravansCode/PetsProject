import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    species: String, 
    breed: String,
    color: String,
    age: Number,
    gender: String,
    lastSeenLocation: String,
    lastSeenDate: Date,
    images: [String], 
    status: { type: String, 
      enum: ["Lost", "Found"], 
      default: "Lost" },
    createdAt: { type: Date, 
      default: Date.now },
  });
  

export default mongoose.model("Pet", PetSchema); 