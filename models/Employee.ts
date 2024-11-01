import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
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
});

// Virtuellt fält för anställningstid i månader
EmployeeSchema.virtual("monthsEmployed").get(function () {
  return Math.floor(
    (Date.now() - this.hiredAt.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );
});

// Virtuellt fält för tid sedan senaste befordran i månader
EmployeeSchema.virtual("monthsSincePromotion").get(function () {
  return Math.floor(
    (Date.now() - this.lastPromoted.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );
});

// Se till att virtuals inkluderas när dokumentet konverteras till JSON
EmployeeSchema.set("toJSON", { virtuals: true });
EmployeeSchema.set("toObject", { virtuals: true });

export default mongoose.models.Employee ||
  mongoose.model("Employee", EmployeeSchema);
