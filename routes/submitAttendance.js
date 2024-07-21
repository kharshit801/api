const express = require('express');
const router = express.Router();
const getAttendanceModel = require("../models/attendance"); // Imported the Attendance model

router.post('/',  async (req, res) => {
    try {
      const attendanceData = req.body;
      console.log("attendanceData: from submit index", attendanceData);
  
      if (attendanceData.length === 0) {
        return res.status(400).json({ message: "No attendance data provided" });
      }
  
      const { group, semester } = attendanceData[0];
      const AttendanceModel = await getAttendanceModel(group, semester);
      
      const result = await AttendanceModel.insertMany(attendanceData);
      
      res.status(200).json({ message: "Attendance submitted successfully", data: result });
    } catch (err) {
      console.error("Error submitting attendance:", err);
      res.status(500).json({ message: "Failed to submit attendance", error: err.message });
    }
  });

module.exports = router;