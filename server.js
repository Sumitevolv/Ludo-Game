// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Create a Schema for Student Data
const studentSchema = new mongoose.Schema({
  name: String,
  math: Number,
  science: Number,
  english: Number,
  history: Number,
  total: Number,
  average: Number,
  performance: String,
});

const Student = mongoose.model('Student', studentSchema);

// POST route to save student data
app.post('/api/evaluate', async (req, res) => {
  const { name, math, science, english, history, total, average, performance } = req.body;
  try {
    const newStudent = new Student({
      name,
      math,
      science,
      english,
      history,
      total,
      average,
      performance,
    });

    await newStudent.save();
    res.status(200).json({ message: 'Student data saved successfully', student: newStudent });
  } catch (err) {
    res.status(500).json({ message: 'Error saving student data', error: err });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
