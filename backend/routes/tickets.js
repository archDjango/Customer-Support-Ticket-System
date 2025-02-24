const express = require("express");
const db = require("../db");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(403).json({ message: "Invalid Token" });
  }
};

// Create Ticket
router.post("/", verifyToken, (req, res) => {
  const { subject, description } = req.body;
  db.query(
    "INSERT INTO tickets (subject, description) VALUES (?, ?)",
    [subject, description],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Ticket created" });
    }
  );
});

// Get All Tickets
router.get("/", verifyToken, (req, res) => {
  db.query("SELECT * FROM tickets", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});
router.delete("/:id", verifyToken, (req, res) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
  
    db.query("DELETE FROM tickets WHERE id = ?", [req.params.id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Ticket deleted" });
    });
  });
  

module.exports = router;
