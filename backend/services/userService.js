const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const registerUser = async (username, email, password) => {
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password
   const hashedPassword = hashPassword(password);

  // Create a new user
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();
};

const loginUser = async (email, password) => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User does not exist');
  }

  // Compare passwords
  const hashedPassword = hashPassword(password);
  if (user.password !== hashedPassword) {
    throw new Error('Invalid email and password combination');
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token, user };
};

module.exports = {
  registerUser,
  loginUser,
};
