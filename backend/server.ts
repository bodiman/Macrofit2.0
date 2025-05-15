import menuRoutes from './routes/menuRoutes';
import foodRoutes from './routes/foodRoutes';
import userRoutes from './routes/userRoutes';
import metricsRoutes from './routes/metricsRoutes';
import { requireAuth } from './middleware/auth';
import { Request, Response, NextFunction } from 'express';


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

// Basic request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    next();
});

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:8081')
  .split(',')
  .map(origin => origin.trim());

const corsOptions = {
  origin: function (origin: string, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Public routes (no auth required)
app.post('/api/register', userRoutes);

// Protected routes (auth required)
app.use('/api', requireAuth);
app.use('/api', userRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/metrics', metricsRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('Environment:', {
        NODE_ENV: process.env.NODE_ENV,
        FRONTEND_URL: process.env.FRONTEND_URL,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? 'Set' : 'Not set'
    });
}); 