// Crazy-Musics Admin Server
const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ========== Middleware ==========
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// ========== MongoDB Connection ==========
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://hemanth:hemanth174@cluster0.onjag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// ========== User Model ==========
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  dob: { type: Date },
  musicGenre: { type: String },
  favoriteArtist: { type: String },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// ========== JWT Secret ==========
const JWT_SECRET = process.env.JWT_SECRET || 'a1b2c3d4e5f60718293a4b5c6d7e8f90';

// ========== Admin Credentials ==========
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'Admin777@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin117';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin';

// ========== Authentication Middleware ==========
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or Expired Token" });
    }

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: "Access Denied: Admin Only" });
    }

    req.admin = decoded;
    next();
  });
};

// ========== Admin Login Route ==========
app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const adminToken = jwt.sign(
      { email: ADMIN_EMAIL, role: 'admin', name: ADMIN_NAME },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      status: "ok",
      token: adminToken
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ========== Get All Users ==========
app.get("/api/users", authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find();

    return res.json({
      count: users.length,
      users: users
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ========== Create User ==========
app.post("/api/users", authenticateAdmin, async (req, res) => {
  try {
    const { fullName, username, password, dob, musicGenre, favoriteArtist } = req.body;

    if (!fullName || !username || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      fullName,
      username,
      password, // In production, hash this password
      dob,
      musicGenre,
      favoriteArtist
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ========== Update User ==========
app.put("/api/users/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, dob, musicGenre, favoriteArtist, password } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (fullName) user.fullName = fullName;
    if (dob) user.dob = dob;
    if (musicGenre) user.musicGenre = musicGenre;
    if (favoriteArtist) user.favoriteArtist = favoriteArtist;
    if (password) user.password = password; // In production, hash this

    await user.save();

    return res.json({
      message: "User updated successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ========== Delete User ==========
app.delete("/api/users/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);

    return res.json({ message: "User deleted successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ========== Root Route ==========
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// ========== Serve Admin Pages ==========
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/analytics', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'analytics.html'));
});

app.get('/reports', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'reports.html'));
});

app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'settings.html'));
});

// ========== Error Handling ==========
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ========== Start Server ==========
app.listen(PORT, () => {
  console.log(`Admin Server running on port ${PORT}`);
});
