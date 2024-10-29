import mongoose from "mongoose";

const StaffPositionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
  },
  performance: {
    type: String,
    enum: ["New", "Low", "Medium", "High"],
    default: "New",
  },
  experience: {
    type: Number,
    default: 0,
    min: 0,
  },
  satisfaction: {
    type: Number,
    default: 100,
    min: 0,
    max: 100,
  },
  productivity: {
    type: Number,
    default: 100,
    min: 0,
    max: 100,
  },
  hiredAt: {
    type: Date,
    default: Date.now,
  },
  lastPromoted: {
    type: Date,
    default: Date.now,
  },
  trainingCompleted: [
    {
      name: String,
      completedAt: Date,
    },
  ],
  status: {
    type: String,
    enum: ["Active", "OnLeave", "Training", "Terminated"],
    default: "Active",
  },
  requirements: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  baseSalary: {
    type: Number,
    required: true,
    min: 0,
  },
  requiredExperience: {
    type: Number,
    required: true,
    min: 0,
  },
});

export default mongoose.models.StaffPosition ||
  mongoose.model("StaffPosition", StaffPositionSchema);
