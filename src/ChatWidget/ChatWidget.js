import React, { useState, useEffect } from 'react';
import { Client as TwilioClient } from '@twilio/conversations';
import './ChatWidget.css'; // Custom styles for the chat widget
import axios from 'axios';

const twilioToken = 'YOUR_TWILIO_JWT'; // Replace with your server-generated token

// Initialize the client
const client = new TwilioClient(twilioToken);

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);


  // Fetch Twilio JWT token and initialize Twilio Client
  useEffect(() => {
    const initializeTwilio = async () => {
      try {
        // Replace this with the endpoint for your server that generates a Twilio token
        const response = await axios.post('/generate-token', { identity: 'user1' });
        const token = response.data.token;

        // Initialize the Twilio Conversations Client
        const twilioClient = new TwilioClient(token);
        setClient(twilioClient);

        // Listen for new messages
        twilioClient.on('messageAdded', (message) => {
          setMessages((prevMessages) => [...prevMessages, message.body]);
        });

      } catch (error) {
        console.error('Error initializing Twilio:', error);
      }
    };

    initializeTwilio();
  }, []);
  
  const handleSendMessage = async () => {
    if (client && message) {
      // Send message using Twilio Conversations API
      client.sendMessage(message)
        .then(() => setMessage(''))  // Clear message input on successful send
        .catch(error => console.error('Message sending failed:', error));
    }
  };

  return (
    <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
      <button className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>
      {isOpen && (
        <div className="chat-window">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className="message">{msg}</div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
