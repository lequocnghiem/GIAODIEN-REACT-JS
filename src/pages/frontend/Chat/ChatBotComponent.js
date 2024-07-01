import React from 'react';
import ChatBot from 'react-simple-chatbot';
import ChatComponent from './ChatComponent';

const steps = [
    { id: '1', message: 'Welcome to our website!', trigger: '2' },
    { id: '2', message: 'How can I help you today?', trigger: '3' },
    { id: '3', user: true, trigger: '4' }, // Tin nhắn từ người dùng
    { id: '4', message: 'Thank you for your message!', end: true }, // Tin nhắn từ chatbot
  ];
  

const ChatBotComponent = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: '1000'
    }}>
      {/* <ChatComponent /> */}
    </div>
  );
};

export default ChatBotComponent;
