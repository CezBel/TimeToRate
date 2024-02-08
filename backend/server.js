import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();
import businesses from './data/businesses.js';
const PORT = process.env.PORT;

connectDB();

const app = express();

app.get('/api/businesses', (req, res) => {
  res.json(businesses);
});

app.get('/api/businesses/:id', (req, res) => {
  const business = businesses.find((b) => b._id === req.params.id);
  res.json(business);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
