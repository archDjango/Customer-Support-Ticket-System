import React, { useEffect, useState } from "react";
import { fetchTickets, deleteTicket } from "../services/api";
import "../styles/ticketList.css";

const TicketList = ({ userRole }) => {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchTickets(filter).then(setTickets);
  }, [filter]);

  return (
    <div className="ticket-list">
      <h2>Support Tickets</h2>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>

      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            {ticket.subject} - {ticket.status}
            {userRole === "admin" && (
              <button onClick={() => deleteTicket(ticket.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
