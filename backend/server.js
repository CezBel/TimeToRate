import express from 'express';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
dotenv.config();
import businessRoutes from './routes/businessRoutes.js';
const PORT = process.env.PORT;

connectDB();

const app = express();

app.use('/api/businesses', businessRoutes);

// errorHandler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
