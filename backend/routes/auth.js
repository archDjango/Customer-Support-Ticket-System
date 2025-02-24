const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    db.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, hashedPassword, role || "user"],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "User registered" });
      }
    );
  });
  

// Login User
router.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ message: "Invalid credentials" });
  
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
  
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
        res.json({ token, role: user.role });
      }
    );
  });
  

module.exports = router;
