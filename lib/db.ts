import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  try {
    console.log("Starting database connection...");
    
    if (cached.conn) {
      console.log("Using existing database connection");
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        maxPoolSize: 10,
      };

      console.log("Creating new database connection...");
      cached.promise = mongoose.connect(process.env.MONGODB_URI!, opts).then((mongoose) => {
        console.log("Database connection established");
        return mongoose;
      });
    }

    cached.conn = await cached.promise;
    console.log("Database connection ready");
    return cached.conn;
  } catch (error) {
    console.error("Database connection error:", error);
    cached.promise = null;
    throw error;
  }
}

export default dbConnect;