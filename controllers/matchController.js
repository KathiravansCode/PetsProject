import Pet from "../models/Petmodel.js";

// AI-Based Pet Matching
export const findMatches = async (req, res) => {
  try {
    const { petId } = req.params;
    const pet = await Pet.findById(petId);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    // Find potential matches (same species & similar location)
    const matches = await Pet.find({
      _id: { $ne: petId }, // Exclude the current pet
      species: pet.species, // Match same species
      lastSeenLocation: { $regex: new RegExp(pet.lastSeenLocation, "i") }, // Loose location match
      status: pet.status === "lost" ? "found" : "lost", // Opposite status (lost vs. found)
    });

    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
