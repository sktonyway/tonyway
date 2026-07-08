import mongoose from 'mongoose'

const uri = process.env.MONGO_URI;

if(!uri){
    throw new Error("MongoDB String required")
}

// Global cache to persist the connection across hot-reloads in development
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri!).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}