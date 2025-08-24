// --- File: utils/api.js ---
// A centralized service for all backend API calls, now with credentials included.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper function to handle fetch responses
const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
};

// A helper to create headers, including the auth token
const getAuthHeaders = (token) => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
});

// --- User Authentication ---
export const loginUser = (email, password) => {
    return fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // <-- ADDED
    }).then(handleResponse);
};

export const registerUser = (name, email, password) => {
    return fetch(`${API_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include', // <-- ADDED
    }).then(handleResponse);
};

// --- Ticket Management ---
export const saveTicket = (ticketData, token) => {
    return fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(ticketData),
        credentials: 'include', // <-- ADDED
    }).then(handleResponse);
};

export const updateTicket = (ticketId, ticketData, token) => {
    return fetch(`${API_URL}/tickets/${ticketId}`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(ticketData),
        credentials: 'include', // <-- ADDED
    }).then(handleResponse);
};

export const fetchMyTickets = (token) => {
    return fetch(`${API_URL}/tickets`, {
        headers: getAuthHeaders(token),
        credentials: 'include', // <-- ADDED
    }).then(handleResponse);
};

// ... and so on for all other fetch calls ...

export const deleteTicket = (ticketId, token) => {
    return fetch(`${API_URL}/tickets/${ticketId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token),
        credentials: 'include', // <-- ADDED
    }).then(handleResponse);
};

export const requestExchange = (ticketId, desiredCoach, token) => {
    return fetch(`${API_URL}/tickets/${ticketId}/exchange`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify({ desiredCoach }),
        credentials: 'include', // <-- ADDED
    }).then(handleResponse);
};

export const checkAvailability = (ticketId, token) => {
    return fetch(`${API_URL}/tickets/${ticketId}/availability`, {
        headers: getAuthHeaders(token),
        credentials: 'include', // <-- ADDED
    }).then(handleResponse);
};

// --- Chat ---
export const fetchChatHistory = (chatId, token) => {
    return fetch(`${API_URL}/chats/${chatId}`, {
        headers: getAuthHeaders(token),
        credentials: 'include', // <-- ADDED
    }).then(handleResponse);
};

// --- Notifications ---
export const fetchNotifications = (token) => {
    return fetch(`${API_URL}/notifications`, {
        headers: getAuthHeaders(token),
        credentials: 'include', // <-- ADDED
    }).then(handleResponse);
};

export const markNotificationRead = (notificationId, token) => {
    return fetch(`${API_URL}/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        credentials: 'include', // <-- ADDED
    }).then(handleResponse);
};
