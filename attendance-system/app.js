const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// MongoDB model for Attendance and Student
const Attendance = require('./models/attendance');
const Student = require('./models/student');

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

// MongoDB connection
mongoose.connect('mongodb://localhost/attendance', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Route for Adding Attendance
app.post('/attendance', async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    if (!studentId || !date || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const attendance = new Attendance({ studentId, date, status });
    await attendance.save();

    res.status(201).json({ message: 'Attendance recorded successfully' });
  } catch (error) {
    console.error('Error recording attendance:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Route to Get Attendance for a Student
app.get('/attendance/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const attendances = await Attendance.find({ studentId });
    if (attendances.length === 0) {
      return res.status(404).json({ error: 'No attendance records found for this student' });
    }
    res.status(200).json(attendances);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Route to Get All Attendance
app.get('/attendance', async (req, res) => {
  try {
    const attendances = await Attendance.find().populate('studentId', 'name');
    res.status(200).json(attendances);
  } catch (error) {
    console.error('Error fetching all attendance:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
