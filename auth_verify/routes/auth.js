const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendOTP = require('../utils/mailer');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Put this in .env in production

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { email, password } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 min

  let user = await User.findOne({ email });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashedPassword });
  }

  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  await sendOTP(email, otp);

  res.json({ message: 'OTP sent to email' });
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpires < new Date()) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({
    message: 'OTP verified. You are logged in.',
    token
  });
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  // Check if user is verified (optional, depending on your flow)
  if (!user.isVerified) {
    return res.status(400).json({ message: 'Please verify your account before logging in.' });
  }

  // Compare password with hashed password stored in DB
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Wrong password' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({
    message: 'Login successful',
    token
  });
});





module.exports = router;
