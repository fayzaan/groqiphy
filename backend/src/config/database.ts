import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI: string | null = process.env.MONGO_URI || null;
    
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}