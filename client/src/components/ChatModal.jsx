// --- File: components/ChatModal.jsx ---
import React, { useEffect, useState } from "react";
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

  // --- FIX IS HERE ---
  // The inline style={{ display: 'flex' }} overrides the display: none from the external CSS file.
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" style={{ display: 'flex' }}>
      <div className="bg-white w-96 rounded-lg shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            Chat with {chatPartner?.name}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg max-w-xs ${
                msg.sender === currentUser._id
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-200"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex p-3 border-t">
          <input
            type="text"
            className="flex-1 border rounded-lg px-3 py-2 mr-2"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.g.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
