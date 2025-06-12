// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/attendanceDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Define your Attendance schema
const attendanceSchema = new mongoose.Schema({
    studentId: String,
    date: String,
    status: String
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

// Define the bounds of the class (adjusted coordinates to include your location)
const classBounds = {
    north: 12.904,   // Slightly north of your latitude
    south: 12.902,   // Slightly south of your latitude
    east: 80.096,    // Slightly east of your longitude
    west: 80.095      // Slightly west of your longitude
};

// Endpoint to mark attendance
app.post('/attendance/mark', async (req, res) => {
    const { studentId, location } = req.body;

    // Check if location is within bounds
    const { lat, lng } = location;
    if (lat < classBounds.south || lat > classBounds.north || 
        lng < classBounds.west || lng > classBounds.east) {
        return res.status(400).send('Location is outside of class bounds.');
    }

    // Create a new attendance record
    const newRecord = new Attendance({
        studentId,
        date: new Date().toISOString().split('T')[0], // Current date
        status: 'Present'
    });

    try {
        await newRecord.save();
        res.status(200).send('Attendance marked successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Endpoint to retrieve all attendance records
app.get('/attendance', async (req, res) => {
    try {
        const records = await Attendance.find();
        res.json(records);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Serve static files
app.use(express.static('public')); // Assuming your HTML file is in a 'public' directory

// Start your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
