import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  },
  performance: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  hiredAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);