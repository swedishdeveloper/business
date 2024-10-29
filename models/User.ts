import mongoose from 'mongoose';
import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false, // Don't include password in queries by default
  },
  company: {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    value: {
      type: Number,
      default: 1000000,
      min: 0,
    },
    cash: {
      type: Number,
      default: 500000,
      min: 0,
    },
    founded: {
      type: Date,
      default: Date.now,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent duplicate model initialization
const User = models.User || model('User', UserSchema);

export default User;