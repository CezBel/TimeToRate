import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import businesses from './data/businesses.js';

const app = express();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.json(businesses);
});

app.get('/api/businesses/:id', (req, res) => {
  const business = businesses.find((b) => b._id === req.params.id);
  res.json(business);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

