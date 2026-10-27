const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');


// 1. stud registration 

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are strictly required.' });
    }

    if (username.length < 4 || username.length > 25) {
      return res.status(400).json({ message: 'username must contain 4 to 25 characters.' });
    }

    if (password.length < 8 || password.length > 20) {
      return res.status(400).json({ message: 'Password must contain 8 to 20 characters.' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'This email is already registered.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword 
    });

    return res.status(201).json({
      message: 'Student registration completed successfully!',
      userId: newUser.id
    });

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error during registration.', error: error.message });
  }
};


// stud login 

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password fields cannot be blank.' });
    }

    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password credentials.' });
    }

    
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '2h' } 
    );

    return res.status(200).json({
      message: 'Login authentication verified successfully!',
      token: `Bearer ${token}`, 
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error during authentication.', error: error.message });
  }
};


// password reset  

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and new password are required.' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'New password must contain at least 8 characters.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'No student account matches this email record.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({ message: 'Student account password has been reset successfully.' });

  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error during password recovery.', error: error.message });
  }
};
