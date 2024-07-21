const express = require("express");
const router = express.Router();
const getclassSchedule = require("../models/classSchedule");


 router.get("/:group/:semester/:day", async (req, res) => {
    console.log("Request received in classSchedule API");
    try {
      const { group, semester, day } = req.params;
        console.log("group: ", group);
        console.log("semester: ", semester);
      const ClassScheduleModel = await getclassSchedule(group, semester);
      const classSchedule = await ClassScheduleModel.find({ day }).sort({ createdAt: -1 });
      console.log("classSchedule: ", classSchedule);
      res.status(200).json(classSchedule);
    } catch (err) {
      console.error("Error fetching class schedule:", err);
      res.status(500).json({ message: "Failed to fetch class schedule", error: err.message });
    }
  });

module.exports = router;