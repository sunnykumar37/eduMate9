const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign token (using a simple secret for now, in production use environment variables)
    jwt.sign(
      payload,
      'edumate_jwt_secret',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Error in register:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // Sign token
    jwt.sign(
      payload,
      'edumate_jwt_secret',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Error in login:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/auth/user
// @desc    Get user data from token
// @access  Private
router.get('/user', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    jwt.verify(token, 'edumate_jwt_secret', async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token is not valid' });
      }

      try {
        // Find user by id
        const user = await User.findById(decoded.user.id).select('-password');
        
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user);
      } catch (err) {
        console.error('Error finding user:', err);
        res.status(500).json({ message: 'Server error' });
      }
    });
  } catch (err) {
    console.error('Error in getting user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/auth/google
// @desc    Google OAuth login/register
// @access  Public
router.get('/google', (req, res) => {
  // This would normally redirect to Google OAuth
  // For now, just responding with a message
  res.json({ message: 'Google OAuth endpoint (to be implemented)' });
});

module.exports = router; 