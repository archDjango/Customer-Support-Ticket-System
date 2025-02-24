import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const registerUser = (userData) => axios.post(`${API_BASE_URL}/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${API_BASE_URL}/auth/login`, userData);

export const fetchTickets = async (status) => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_BASE_URL}/tickets`, {
    headers: { Authorization: `Bearer ${token}` },
    params: status ? { status } : {}
  }).then(res => res.data);
};

export const createTicket = (ticketData) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_BASE_URL}/tickets`, ticketData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteTicket = (id) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${API_BASE_URL}/tickets/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
