const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getModel } = require("../models/proffModel");

const router = express.Router();


router.use(bodyParser.json());

// Login route
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login request body:', req.body);

    const proffModel = getModel();

    if (!proffModel) {
      console.error('ProffModel is not initialized');
      return res.status(500).json({ message: "Database not ready" });
    }

    // Find the professor in the database
    const proff = await proffModel.findOne({ Email: email });

    if (!proff) {
      return res.status(404).json({ message: "Professor not found" });
    }

    let isValidPassword;
    if (proff.password) {
      // Check against stored password
      isValidPassword = await bcrypt.compare(password, proff.password);
      // isValidPassword = password === proff.password;
    } else {
      const firstName = proff.Name.split(' ')[0];
      const expectedPassword = firstName.toLowerCase();
      isValidPassword = (password === expectedPassword);
      console.log("Expected password", expectedPassword);
    }

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If credentials are valid, create a JWT token
    const token = jwt.sign({ email: proff.Email }, 'Team_Auxin_was_here', { expiresIn: '1h' });

    // Send the token and some user info back to the client
    res.json({
      token,
      user: {
        Email: proff.Email,
        Name: proff.Name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

// Token verification route
router.post('/verify-token', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, 'Team_Auxin_was_here', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        
        res.json({ user: decoded });
    });
});

router.post('/reset-password', async (req, res) => {
  try {
      const { email, currentPassword, newPassword } = req.body;
      
      const proffModel = getModel();
      if (!proffModel) {
          return res.status(500).json({ message: "Database not ready" });
      }

      const professor = await proffModel.findOne({ Email: email });
      if (!professor) {
          return res.status(404).json({ message: "Professor not found" });
      }

      // Check current password
      let isValidPassword;
      if (professor.password) {
          isValidPassword = await bcrypt.compare(currentPassword, professor.password);
      } else {
        const firstName = proff.Name.split(' ')[0];
        const expectedPassword = firstName.toLowerCase();
          isValidPassword = (currentPassword === expectedPassword);
      }

      if (!isValidPassword) {
          return res.status(401).json({ message: "Current password is incorrect" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the password in the database
      professor.password = hashedPassword;
      await professor.save();

      res.json({ message: "Password reset successfully" });
  } catch (error) {
      console.error('Password reset error:', error);
      res.status(500).json({ message: "An error occurred during password reset" });
  }
});


module.exports = router;
