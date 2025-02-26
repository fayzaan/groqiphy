// src/app.ts
import express from 'express';
import cors from 'cors';
import adminRoutes from './routes/admin';
import hintsRoutes from './routes/hints';
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', adminRoutes);
app.use('/api', hintsRoutes);
export default app;