import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Development', 'Active', 'Discontinued'],
    default: 'Development',
  },
  development: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  revenue: {
    type: Number,
    default: 0,
  },
  developmentCost: {
    type: Number,
    required: true,
  },
  monthlyCost: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);