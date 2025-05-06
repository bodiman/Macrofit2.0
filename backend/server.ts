import menuRoutes from './routes/menuRoutes';
import foodRoutes from './routes/foodRoutes';
import userRoutes from './routes/userRoutes';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/menus', menuRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 