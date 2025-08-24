// --- File: components/ChatModal.jsx ---
import React, 'react';
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { fetchChatHistory } from "../utils/api";

// Use your backend URL from env
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001";

let socket;

const ChatModal = ({ isOpen, onClose, chatPartner, currentUser, token }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Connect socket when modal opens
  useEffect(() => {
    if (!isOpen || !currentUser) return;

    // Initialize socket connection
    socket = io(SOCKET_URL, {
      query: { userId: currentUser._id },
      transports: ["websocket"],
    });

    // Fetch existing chat history
    const chatId = [currentUser._id, chatPartner._id].sort().join("-");
    fetchChatHistory(chatId, token)
      .then((history) => setMessages(history))
      .catch((err) => console.error("Failed to load history:", err));

    // Listen for incoming messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [isOpen, chatPartner, currentUser, token]);

  // Send message
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const msgData = {
      sender: currentUser._id,
      receiver: chatPartner._id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    socket.emit("sendMessage", msgData);
    setMessages((prev) => [...prev, msgData]);
    setNewMessage("");
  };

  if (!isOpen) return null;

  // --- UI RESTORED ---
  // This JSX now matches the original, more styled UI from your self-contained file.
  return (
    <div className="modal" style={{ display: 'flex' }}>
        <div className="modal-content chat-container">
            <div className="modal-header chat-header">
                <h4 id="chat-with-name">Chat with {chatPartner?.name}</h4>
                <button id="close-chat" className="modal-close" onClick={onClose}>&times;</button>
            </div>
            <div className="modal-body chat-messages" id="chat-messages">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`message ${
                    msg.sender === currentUser._id
                      ? "sent"
                      : "received"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="modal-footer chat-input">
                <input 
                  type="text" 
                  id="message-input" 
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button id="send-btn" onClick={sendMessage}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </div>
        </div>
    </div>
  );
};

export default ChatModal;
