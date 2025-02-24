import React from "react";
import "../styles/filter.css";

const FilterTickets = ({ filterStatus, setFilterStatus }) => {
  return (
    <div className="filter-container">
      <label>Filter by Status:</label>
      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="All">All</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>
    </div>
  );
};

export default FilterTickets;
