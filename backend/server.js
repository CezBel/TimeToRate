import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import businessRoutes from './routes/businessRoutes.js';
import usersRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/businesses', businessRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// errorHandler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
