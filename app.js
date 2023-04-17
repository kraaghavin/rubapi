//app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js'; // Update the import paths to use ES6 modules
import userRoutes from './routes/users.js'; // Update the import paths to use ES6 modules
import serviceRoutes from './routes/services.js'; // Update the import paths to use ES6 modules
import errorHandler from './utils/errorHandler.js'; // Update the import paths to use ES6 modules

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
