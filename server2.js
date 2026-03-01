// ============================================
// 🔐 Secure Express App (Week 1–3 Complete)
// ============================================

// 1️⃣ Import Required Packages
const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');

// 2️⃣ Initialize App
const app = express();
app.use(express.json());

// 🔒 Security Headers
app.use(helmet());

// 📊 Logging Middleware (Week 3)
app.use(morgan('combined'));

// 3️⃣ Temporary In-Memory Database
let users = [];

// Secret Key (Use environment variable in real apps)
const SECRET_KEY = "your-secret-key";

// ============================================
// 🏠 Home Route
// ============================================
app.get('/', (req, res) => {
  res.send("Secure Server Running 🚀");
});

// ============================================
// 🔐 SIGNUP ROUTE
// ============================================
app.post('/signup', async (req, res) => {

  const { email, password } = req.body;

  console.log("Signup attempt:", email);

  // Validate Email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Validate Password
  if (!validator.isLength(password, { min: 6 })) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  // Check if user exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    email,
    password: hashedPassword
  });

  res.json({ message: "User registered successfully" });
});


// ============================================
// 🔐 LOGIN ROUTE
// ============================================
app.post('/login', async (req, res) => {

  const { email, password } = req.body;

  console.log("Login attempt:", email);

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { email: user.email },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ token });
});


// ============================================
// 🔐 Authentication Middleware
// ============================================
function authenticateToken(req, res, next) {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {

    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}


// ============================================
// 🔐 Protected Route
// ============================================
app.get('/profile', authenticateToken, (req, res) => {

  res.json({
    message: "Protected Profile Data ✅",
    user: req.user
  });

});


// ============================================
// 🛡 Global Error Handler (Extra Security)
// ============================================
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ error: "Something went wrong" });
});


// ============================================
// 🚀 Start Server
// ============================================
app.listen(3000, () => {
  console.log("Server listening on port 3000 🔥");
});