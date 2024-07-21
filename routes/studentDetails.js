const express = require("express");
const router = express.Router();
const getStudentModel = require("../models/student");
router.get("/:group/:semester",  async (req, res) => {
    try {
      const { group, semester } = req.params;
      const StudentModel = getStudentModel.getModel();
      const students = await StudentModel.find(
        { group, semester },
        { name: 1, regNo: 1, _id: 0 }
      );
      res.status(200).json(students);
    } catch (err) {
      console.log("Fetching student list");
      res.status(500).json({ message: "Failed to fetch student list" });
    }
  });

module.exports = router;