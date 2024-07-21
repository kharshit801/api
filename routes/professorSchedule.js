// routes/professorSchedule.js
const express = require('express');
const getProfessorScheduleModel = require("../models/professorSchedule");
const router = express.Router();

// Get all schedules for a professor
router.get('/:professorId', async (req, res) => {
  try {
    const { professorId } = req.params;
    const ProfessorScheduleModel = await getProfessorScheduleModel(professorId);
    const schedules = await ProfessorScheduleModel.find().sort({ day: 1, time: 1 });
    res.json(schedules);
  } catch (error) {
    console.error('Error fetching professor schedules:', error);
    res.status(500).json({ error: 'Failed to fetch professor schedules' });
  }
});


module.exports = router;