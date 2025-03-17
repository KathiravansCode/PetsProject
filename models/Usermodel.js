import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: String,
  location: String,
  profilePic: String,
  createdAt: { type: Date, 
    default: Date.now },
});

export default mongoose.model("User", UserSchema); 