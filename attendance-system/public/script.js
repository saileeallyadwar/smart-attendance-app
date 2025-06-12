document.getElementById('checkAttendanceBtn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
           //Gayana's home coordinates
            const classroomBoundary = {
                lat1: 12.906, // Updated northeast latitude
                lon1: 80.101, // Updated northeast longitude
                lat2: 12.902, // Updated southwest latitude
                lon2: 80.089  // Updated southwest longitude
            };

            // Check if the current position is within the classroom boundary
            if (lat <= classroomBoundary.lat1 && lat >= classroomBoundary.lat2 && lon <= classroomBoundary.lon1 && lon >= classroomBoundary.lon2) {
                const studentId = '6730d3196da75022326d6a51';  // Replace with a valid student ID
                const date = new Date().toISOString().split('T')[0];
                const status = 'Present';

                fetch('http://localhost:3000/attendance', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ studentId, date, status }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Attendance recorded:', data);
                    window.location.href = 'attendanceStatus.html';
                })
                .catch(error => {
                    console.error('Error recording attendance:', error);
                    alert('Error recording attendance');
                });
            } else {
                alert('You are outside the classroom boundary');
            }
        });
    } else {
        alert('Geolocation is not supported by this browser');
    }
});
