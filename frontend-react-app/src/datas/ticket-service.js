import axios from "axios";

// --- Constants ----------------
const API_HOST = "http://localhost:4000/api/v1";
const SERVICE_NAME = "/ticket";


// --- Functions ----------------
export const getTicketAPI = async (ticketId) => {
    const response = await axios.get(`${API_HOST}${SERVICE_NAME}/${ticketId}`);
    return response.data;
}


export const createTicketAPI = async (ticketData) => {
    const response = await axios.put(`${API_HOST}${SERVICE_NAME}`, ticketData);
    return response.data;
}


export const updateTicketAPI = async (ticketId, ticketData) => {
    const data = {
        ticket_id: ticketId,
        ticket_name: ticketData.ticket_name,
        ticket_description: ticketData.ticket_description
    }
    const response = await axios.post(`${API_HOST}${SERVICE_NAME}`, data);
    return response.data;
}


export const deleteTicketAPI = async (ticketId) => {
    const response = await axios.delete(`${API_HOST}${SERVICE_NAME}/${ticketId}`);
    return response.data;
}