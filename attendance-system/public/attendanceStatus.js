// Function to fetch attendance status of all students
function getAttendanceStatus() {
    fetch('/attendance')  // Get all attendance records
        .then(response => response.json())
        .then(attendances => {
            const tableBody = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];

            // Loop through all attendance records
            const studentAttendanceMap = {};

            attendances.forEach(attendance => {
                const studentId = attendance.studentId._id;
                const studentName = attendance.studentId.name;
                const status = attendance.status;

                if (!studentAttendanceMap[studentId]) {
                    studentAttendanceMap[studentId] = {
                        name: studentName,
                        present: 0,
                        absent: 0
                    };
                }

                // Update the present/absent count
                if (status === 'Present') {
                    studentAttendanceMap[studentId].present++;
                } else {
                    studentAttendanceMap[studentId].absent++;
                }
            });

            // Populate the table with student attendance status
            for (const studentId in studentAttendanceMap) {
                const student = studentAttendanceMap[studentId];
                const row = tableBody.insertRow();

                const nameCell = row.insertCell(0);
                nameCell.textContent = student.name;

                const presentCell = row.insertCell(1);
                presentCell.textContent = student.present;

                const absentCell = row.insertCell(2);
                absentCell.textContent = student.absent;
            }
        })
        .catch(error => console.error('Error fetching attendance status:', error));
}

// Call the function to fetch and display attendance status
getAttendanceStatus();
