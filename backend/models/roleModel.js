import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    focus: { type: String, required: true },
    questionCount: { type: Number, required: true },
  },
  { timestamps: true }
);

// Ensure the Role model is created exactly once per process
const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);

export default Role;
