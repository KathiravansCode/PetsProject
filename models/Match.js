import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema({
  lostPet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  foundPet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  similarityScore: { type: Number, required: true }, // AI-based match percentage
  matchedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Match", MatchSchema);