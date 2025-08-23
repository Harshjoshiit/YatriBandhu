// --- File: hooks/useSocket.js ---
// A custom hook to manage the Socket.io connection.

import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001';

export const useSocket = (chatId) => {
    // Use state to manage the socket instance. This ensures components re-render when the socket connects.
    const [socket, setSocket] = useState(null); 
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        // Initialize the socket connection
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket); // Set the socket in state once it's created

        // Join the specific chat room
        if (chatId) {
            newSocket.emit('joinRoom', chatId);
        }

        // Listen for incoming messages
        newSocket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Listen for typing indicators
        newSocket.on('typing', () => setIsTyping(true));
        newSocket.on('stopTyping', () => setIsTyping(false));

        // Clean up on component unmount
        return () => {
            newSocket.disconnect();
        };
    }, [chatId]); // This effect runs once when the chatId is first provided

    // Function to send a message
    const sendMessage = (messageData) => {
        if (socket) { // Check if socket is connected before emitting
            socket.emit('sendMessage', messageData);
            setMessages((prevMessages) => [...prevMessages, messageData]); // Add own message immediately
        }
    };

    // Functions to emit typing events
    const startTyping = () => { 
        if (socket) socket.emit('typing', { chatId }); 
    };
    const stopTyping = () => { 
        if (socket) socket.emit('stopTyping', { chatId }); 
    };

    // Return the socket instance along with other state and functions
    return { messages, setMessages, isTyping, sendMessage, startTyping, stopTyping, socket };
};
