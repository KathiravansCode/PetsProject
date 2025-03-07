import express from "express";
import Pet from "../models/Petmodel.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Create a new pet report with image upload
router.post("/report", upload.array("images", 5), async (req, res) => {
  try {
    const imagePaths = req.files.map(file => file.path);
    const pet = new Pet({ ...req.body, images: imagePaths });
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all reported pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single pet by ID
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update pet details
router.put("/:id", async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPet) return res.status(404).json({ message: "Pet not found" });
    res.json(updatedPet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a pet report
router.delete("/:id", async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    if (!deletedPet) return res.status(404).json({ message: "Pet not found" });
    res.json({ message: "Pet report deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

