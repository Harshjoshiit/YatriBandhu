// --- File: src/components/ChatModal.jsx ---
import React, { useState, useEffect } from "react";
import socket from "../socket";
import { fetchChatHistory, blockUser, unblockUser } from "../utils/api";

const ChatModal = ({ isOpen, onClose, chatPartner, currentUser, token }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [amIBlocked, setAmIBlocked] = useState(false);

  const chatId = [currentUser._id, chatPartner._id].sort().join("_");

  // Fetch chat history and join room
  useEffect(() => {
    if (!isOpen) return;

    fetchChatHistory(chatId, token)
      .then((history) => setMessages(history))
      .catch((err) => console.error("Failed to fetch chat history:", err));

    socket.emit("joinRoom", chatId);

    const handleReceiveMessage = (message) =>
      setMessages((prev) => [...prev, message]);
    const handleTyping = () => setIsTyping(true);
    const handleStopTyping = () => setIsTyping(false);
    const handleUserBlocked = ({ blockerId }) => {
      if (blockerId === chatPartner._id) setAmIBlocked(true);
    };
    const handleUserUnblocked = () => setAmIBlocked(false);

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);
    socket.on("userBlocked", handleUserBlocked);
    socket.on("userUnblocked", handleUserUnblocked);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
      socket.off("userBlocked", handleUserBlocked);
      socket.off("userUnblocked", handleUserUnblocked);
    };
  }, [isOpen, chatId, chatPartner._id, token]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || isBlocked || amIBlocked) return;

    const messageData = {
      chatId,
      senderId: currentUser._id,
      recipientId: chatPartner._id,
      text: newMessage,
    };

    socket.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
    socket.emit("stopTyping", { chatId });
  };

  const handleBlockToggle = async () => {
    try {
      if (isBlocked) {
        await unblockUser(chatPartner._id, token);
        socket.emit("unblockUser", { chatId });
        setIsBlocked(false);
      } else {
        if (
          window.confirm(
            `Are you sure you want to block ${chatPartner.name}?`
          )
        ) {
          await blockUser(chatPartner._id, token);
          socket.emit("blockUser", { chatId, blockerId: currentUser._id });
          setIsBlocked(true);
        }
      }
    } catch (error) {
      alert(`Failed to update block status: ${error.message}`);
    }
  };

  const placeholderText = amIBlocked
    ? "You have been blocked"
    : isBlocked
    ? "You blocked this user"
    : "Type a message...";
  const isDisabled = isBlocked || amIBlocked;

  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: "flex" }}>
      <div className="modal-content chat-container">
        <div className="modal-header chat-header">
          <h4>Chat with {chatPartner?.name}</h4>
          <div className="chat-actions">
            <button
              onClick={handleBlockToggle}
              className={`btn ${isBlocked ? "btn-unblock" : "btn-block"}`}
              disabled={amIBlocked}
            >
              {isBlocked ? "Unblock" : "Block"}
            </button>
          </div>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body chat-messages">
          {messages.map((msg, idx) => {
            // --- FIX IS HERE ---
            // This logic now correctly identifies the sender for both real-time and fetched messages.
            const isSentByMe = (msg.sender?._id || msg.senderId) === currentUser._id;
            return (
              <div
                key={idx}
                className={`message ${isSentByMe ? "sent" : "received"}`}
              >
                {msg.text}
              </div>
            );
          })}
        </div>

        {isTyping && <div id="typing-indicator">...typing</div>}

        <div className="modal-footer chat-input">
          <input
            type="text"
            placeholder={placeholderText}
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              if (!isDisabled) socket.emit("typing", { chatId });
            }}
            onBlur={() => socket.emit("stopTyping", { chatId })}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={isDisabled}
          />
          <button onClick={handleSendMessage} disabled={isDisabled}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
