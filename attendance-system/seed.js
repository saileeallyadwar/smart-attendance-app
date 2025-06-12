const mongoose = require('mongoose');
const Student = require('./models/student'); // Ensure this model has fields for name and registration number

mongoose.connect('mongodb://localhost/attendance', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB for seeding');
    return seedStudents();
  })
  .catch((error) => {
    console.error('Could not connect to MongoDB for seeding:', error);
  });

async function seedStudents() {
  const students = [
    { name: 'Gayana', registrationNumber: '22BCE1030' },
    { name: 'Hari', registrationNumber: '22BCE1480' },
    { name: 'Shreya', registrationNumber: '22BCE1541' },
    { name: 'Vinayak', registrationNumber: '22BCE1556' },
  ];

  // Clear existing students
  await Student.deleteMany({});
  
  // Insert new students
  await Student.insertMany(students);
  console.log('Students seeded successfully');
}

// Function to log in and mark attendance
async function markAttendance(registrationNumber) {
  try {
    const student = await Student.findOne({ registrationNumber });

    if (!student) {
      console.log('No student found with this registration number.');
      return;
    }

    // Logic to mark attendance can be added here
    console.log(`Attendance marked for ${student.name} with registration number ${registrationNumber}`);
    // You can add code here to save the attendance record in another collection if needed

  } catch (error) {
    console.error('Error marking attendance:', error);
  }
}

// Export the functions if needed for external use
module.exports = {
  seedStudents,
  markAttendance,
};
