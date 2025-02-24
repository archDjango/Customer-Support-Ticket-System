const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'root', // Replace with your MySQL password
    database: 'support_ticket'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected');
});

// Create a new ticket
app.post('/tickets', (req, res) => {
    const { subject, description } = req.body;
    const query = 'INSERT INTO tickets (subject, description) VALUES (?, ?)';
    db.query(query, [subject, description], (err, result) => {
        if (err) throw err;
        res.status(201).send('Ticket created');
    });
});

// Fetch all tickets
app.get('/tickets', (req, res) => {
    const query = 'SELECT * FROM tickets';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    });
});

// Fetch a single ticket by ID
app.get('/tickets/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM tickets WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.status(200).json(results[0]);
    });
});

// Update a ticket
app.put('/tickets/:id', (req, res) => {
    const { id } = req.params;
    const { subject, description, status } = req.body;
    const query = 'UPDATE tickets SET subject = ?, description = ?, status = ? WHERE id = ?';
    db.query(query, [subject, description, status, id], (err, result) => {
        if (err) throw err;
        res.status(200).send('Ticket updated');
    });
});

// Delete a ticket
app.delete('/tickets/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tickets WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.status(200).send('Ticket deleted');
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});