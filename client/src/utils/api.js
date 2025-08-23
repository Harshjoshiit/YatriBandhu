// --- File: utils/api.js ---
// A centralized service for all backend API calls.

const API_URL = 'http://localhost:3001/api';

// Helper function to handle fetch responses
const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
};

// --- User Authentication ---
export const loginUser = (email, password) => {
    return fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    }).then(handleResponse);
};

export const registerUser = (name, email, password) => {
    return fetch(`${API_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    }).then(handleResponse);
};

// --- NEW: Block/Unblock Functions ---
export const blockUser = (userIdToBlock, token) => {
    return fetch(`${API_URL}/users/block/${userIdToBlock}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
    }).then(handleResponse);
};

export const unblockUser = (userIdToUnblock, token) => {
    return fetch(`${API_URL}/users/block/${userIdToUnblock}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
    }).then(handleResponse);
};

// --- Ticket Management ---
export const saveTicket = (ticketData, token) => {
    return fetch(`${API_URL}/tickets`, { // Note: Changed from /save
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(ticketData),
    }).then(handleResponse);
};

export const updateTicket = (ticketId, ticketData, token) => {
    return fetch(`${API_URL}/tickets/${ticketId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(ticketData),
    }).then(handleResponse);
};

export const fetchMyTickets = (token) => {
    return fetch(`${API_URL}/tickets`, {
        headers: { 'Authorization': `Bearer ${token}` },
    }).then(handleResponse);
};

export const deleteTicket = (ticketId, token) => {
    return fetch(`${API_URL}/tickets/${ticketId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
    }).then(handleResponse);
};

export const requestExchange = (ticketId, desiredCoach, token) => {
    return fetch(`${API_URL}/tickets/${ticketId}/exchange`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ desiredCoach }),
    }).then(handleResponse);
};

export const checkAvailability = (ticketId, token) => {
    return fetch(`${API_URL}/tickets/${ticketId}/availability`, {
        headers: { 'Authorization': `Bearer ${token}` },
    }).then(handleResponse);
};

// --- Chat ---
export const fetchChatHistory = (chatId, token) => {
    return fetch(`${API_URL}/chats/${chatId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
    }).then(handleResponse);
};

// --- Notifications ---
export const fetchNotifications = (token) => {
    return fetch(`${API_URL}/notifications`, {
        headers: { 'Authorization': `Bearer ${token}` },
    }).then(handleResponse);
};

export const markNotificationRead = (notificationId, token) => {
    return fetch(`${API_URL}/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
    }).then(handleResponse);
};
