const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  
  userSchema.pre('save', async function (next) {
    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      // Hash the password with the salt
      const passwordHash = await bcrypt.hash(this.password, salt);
      // Replace the plain password with the hashed password
      this.password = passwordHash;
      next();
    } catch (error) {
      next(error);
    }
  });

  const User = mongoose.model('User', userSchema);

module.exports = User;

  