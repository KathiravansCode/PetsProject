import Pet from "../models/Petmodel.js";

// Create a new pet report (Lost/Found)
export const createPet = async (req, res) => {
  try {
    const { name, species, breed, color, age, gender, lastSeenLocation, lastSeenDate, status } = req.body;

    const newPet = new Pet({
      owner: req.user.id, // Owner from authMiddleware
      name,
      species,
      breed,
      color,
      age,
      gender,
      lastSeenLocation,
      lastSeenDate,
      images: req.files ? req.files.map(file => file.path) : [], // Image upload
      status,
    });

    await newPet.save();
    res.status(201).json({ message: "Pet reported successfully", pet: newPet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all lost/found pets
export const getPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate("owner", "name email phone");
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single pet by ID
export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("owner", "name email phone");
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a pet report
export const updatePet = async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPet) return res.status(404).json({ message: "Pet not found" });

    res.json({ message: "Pet updated successfully", pet: updatedPet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a pet report
export const deletePet = async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    if (!deletedPet) return res.status(404).json({ message: "Pet not found" });

    res.json({ message: "Pet deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};