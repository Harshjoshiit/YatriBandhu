// --- File: ChatModal.jsx ---
// Now fully connected with real-time chat, message history, and block/unblock functionality.

import React, { useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { fetchChatHistory, blockUser, unblockUser } from '../utils/api';

export const ChatModal = ({ isOpen, onClose, chatPartner, currentUser, token }) => {
    const [newMessage, setNewMessage] = useState('');
    const [isBlocked, setIsBlocked] = useState(false);
    const [amIBlocked, setAmIBlocked] = useState(false);
    
    // Create a consistent chat ID
    const chatId = [currentUser._id, chatPartner._id].sort().join('_'); 
    
    // --- FIX: Destructure the 'socket' object from the useSocket hook ---
    const { messages, setMessages, isTyping, sendMessage, startTyping, stopTyping, socket } = useSocket(chatId);

    // Add listeners for real-time block/unblock events
    useEffect(() => {
        if (socket) {
            socket.on('userBlocked', ({ blockerId }) => {
                if (blockerId === chatPartner._id) {
                    setAmIBlocked(true);
                }
            });
            socket.on('userUnblocked', () => {
                setAmIBlocked(false);
            });
        }
        // Cleanup listeners
        return () => {
            if (socket) {
                socket.off('userBlocked');
                socket.off('userUnblocked');
            }
        };
    }, [socket, chatPartner._id]);

    // Fetch message history when the modal opens
    useEffect(() => {
        if (isOpen) {
            fetchChatHistory(chatId, token)
                .then(history => setMessages(history))
                .catch(err => console.error("Failed to fetch chat history:", err));
        }
    }, [isOpen, chatId, token, setMessages]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const messageData = { chatId, senderId: currentUser._id, recipientId: chatPartner._id, text: newMessage };
            sendMessage(messageData);
            setNewMessage('');
            stopTyping();
        }
    };

    const handleBlockToggle = async () => {
        // This check ensures the socket object is available before trying to use it.
        if (!socket) {
            alert("Connection not yet established. Please try again in a moment.");
            return;
        }

        try {
            if (isBlocked) {
                await unblockUser(chatPartner._id, token);
                socket.emit('unblockUser', { chatId }); // Notify other user
                alert(`${chatPartner.name} has been unblocked.`);
                setIsBlocked(false);
            } else {
                if (window.confirm(`Are you sure you want to block ${chatPartner.name}? You will not be able to send or receive messages.`)) {
                    await blockUser(chatPartner._id, token);
                    socket.emit('blockUser', { chatId, blockerId: currentUser._id }); // Notify other user
                    alert(`${chatPartner.name} has been blocked.`);
                    setIsBlocked(true);
                }
            }
        } catch (error) {
            alert(`Failed to update block status: ${error.message}`);
        }
    };

    if (!isOpen) return null;

    const placeholderText = amIBlocked ? "You have been blocked by this user" : (isBlocked ? "You have blocked this user" : "Type a message...");
    const isDisabled = isBlocked || amIBlocked;

    return (
        <div className="modal" style={{ display: 'flex' }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h4>Chat with {chatPartner.name}</h4>
                    <div className="chat-actions">
                        <button onClick={handleBlockToggle} className={`btn ${isBlocked ? 'btn-unblock' : 'btn-block'}`} disabled={amIBlocked}>
                            {isBlocked ? 'Unblock' : 'Block'}
                        </button>
                    </div>
                    <button onClick={onClose} className="modal-close">&times;</button>
                </div>
                <div className="modal-body chat-messages">
                    {messages.map((msg, index) => {
                        // FIX: This logic correctly identifies the sender for both real-time and fetched messages.
                        const isSentByMe = (msg.sender?._id || msg.senderId) === currentUser._id;
                        return (
                            <div key={index} className={`message ${isSentByMe ? 'sent' : 'received'}`}>
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
                            startTyping();
                        }}
                        onBlur={stopTyping}
                        disabled={isDisabled}
                    />
                    <button onClick={handleSendMessage} disabled={isDisabled}>Send</button>
                </div>
            </div>
        </div>
    );
};
