import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";

const GenerateQR = () => {
  const navigate = useNavigate();
  const [qrData, setQrData] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);

  const handleGenerateQR = async () => {
    // In a real application, you might want to generate a unique identifier or use some specific data
    try {
      const response = await axios.post(
        "http://localhost:5000/qr/generate-qr",
        {
          teacherId: "teacher123", // Replace with the actual unique identifier
        }
      );
      setQrData(response.data.qrCodeURL);
      setQrGenerated(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const handleLogout = () => {
    // Implement logout logic here
    // For now, we'll just redirect to the login page
    navigate("/login/employee");
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg card-shadow p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Generate QR Code
        </h2>
        <div className="flex justify-center mb-6">
          <button
            onClick={handleGenerateQR}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Generate QR
          </button>
        </div>
        {qrGenerated && (
          <div className="flex flex-col items-center">
            <QRCodeSVG value={qrData} size={256} className="mb-4" />
            <p className="text-sm text-gray-600 mb-4">QR Code Data: {qrData}</p>
          </div>
        )}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateQR;
