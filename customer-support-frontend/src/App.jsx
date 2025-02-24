import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [newTicket, setNewTicket] = useState({ subject: '', description: '' });
    const [editTicket, setEditTicket] = useState({ id: null, subject: '', description: '', status: 'Open' });
    const [filterStatus, setFilterStatus] = useState('All'); // State for filter

    // Fetch all tickets
    useEffect(() => {
        fetchTickets();
    }, []);

    // Update filtered tickets when tickets or filter changes
    useEffect(() => {
        if (filterStatus === 'All') {
            setFilteredTickets(tickets);
        } else {
            setFilteredTickets(tickets.filter(ticket => ticket.status === filterStatus));
        }
    }, [tickets, filterStatus]);

    const fetchTickets = async () => {
        const response = await axios.get('http://localhost:5000/tickets');
        setTickets(response.data);
    };

    // Create a new ticket
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/tickets', newTicket);
        setNewTicket({ subject: '', description: '' });
        fetchTickets();
    };

    // Update a ticket
    const handleUpdate = async () => {
        await axios.put(`http://localhost:5000/tickets/${editTicket.id}`, editTicket);
        setEditTicket({ id: null, subject: '', description: '', status: 'Open' });
        fetchTickets();
    };

    // Delete a ticket
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/tickets/${id}`);
        fetchTickets();
    };

    return (
        <div className="app">
            <h1>Customer Support Ticket System</h1>

            {/* Form to create a new ticket */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Subject"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    required
                />
                <button type="submit">Create Ticket</button>
            </form>

            {/* Filter dropdown */}
            <div className="filter">
                <label>Filter by Status: </label>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select>
            </div>

            {/* Display tickets in a table */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Subject</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTickets.map((ticket) => (
                        <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{ticket.subject}</td>
                            <td>{ticket.description}</td>
                            <td>{ticket.status}</td>
                            <td>
                                <button onClick={() => setEditTicket(ticket)}>Edit</button>
                                <button onClick={() => handleDelete(ticket.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit form */}
            {editTicket.id && (
                <div className="edit-form">
                    <h2>Edit Ticket</h2>
                    <input
                        type="text"
                        placeholder="Subject"
                        value={editTicket.subject}
                        onChange={(e) => setEditTicket({ ...editTicket, subject: e.target.value })}
                    />
                    <textarea
                        placeholder="Description"
                        value={editTicket.description}
                        onChange={(e) => setEditTicket({ ...editTicket, description: e.target.value })}
                    />
                    <select
                        value={editTicket.status}
                        onChange={(e) => setEditTicket({ ...editTicket, status: e.target.value })}
                    >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => setEditTicket({ id: null, subject: '', description: '', status: 'Open' })}>
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default App;