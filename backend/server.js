require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const todoRoutes = require('./routes/todos');

const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('Todo app backend is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

if (!process.env.MONGO_URI) {
  console.error('CRITICAL: MONGO_URI environment variable is missing!');
} else {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB successfully');
    })
    .catch((err) => {
      console.error('MongoDB connection failed:', err.message);
    });
}
