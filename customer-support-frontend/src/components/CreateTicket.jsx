import React, { useState } from "react";
import { createTicket } from "../services/api";
import "../styles/createTicket.css";

const CreateTicket = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTicket({ subject, description });
    window.location.reload();
  };

  return (
    <div className="create-ticket">
      <h2>Create a Support Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">Submit Ticket</button>
      </form>
    </div>
  );
};

export default CreateTicket;
