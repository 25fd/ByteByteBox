const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const cors = require('cors');

// Import routes
const userRoutes = require('./routes/user.js');

// Load environment variables from a .env file
require('dotenv').config();

// Set up the app
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use('/api/user', userRoutes);

// Connect to MongoDB
connectDB();

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
