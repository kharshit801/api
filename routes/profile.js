const express = require('express');
const router = express.Router();
const { getModel } = require('../models/proffModel');

router.get('/:userEmail', async (req, res) => {
  try {
    const Professor = getModel();
    const professor = await Professor.findOne({ Email: req.params.userEmail });
    
    if (!professor) {
      return res.status(404).json({ message: 'Professor not found' });
    }

    // Remove sensitive information
    const profile = {
      name: professor.Name,
      email: professor.Email
    };

    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

module.exports = router;