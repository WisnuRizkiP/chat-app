// src/components/Chat.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

export default function Chat() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const room = searchParams.get('room');
  const username = searchParams.get('username');

  console.log(room,username)

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false)
  const [userType,setUserType] = useState('')
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000'); // Replace with your server URL
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      const joinObj = JSON.stringify({ room, username })
      console.log(joinObj)
      socket.emit('join-room', { room, username });

      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on('typing', ({ userType, isTyping }) => {
        console.log(`${userType} is typing: ${isTyping}`);
        setIsTyping(isTyping);
        setUserType(userType)
      });
    }
  }, [socket, room, username]);

  const handleSend = () => {
    if (newMessage.trim() && socket) {

      socket.emit('text-chat', { room, username, message: newMessage });
      setNewMessage('');
    }
  };

  const handleTyping = () => {
    socket.emit('typing', { room, username, isTyping: true });
    setTimeout(() => {
      socket.emit('typing', { room, username, isTyping: false });
    }, 3000);
  };

  return (
    <div className='w-full h-screen flex justify-center'>
      <div className='w-3/6 h-screen border border-gray-200'>
        <h1 className='text-center text-2xl mt-3 font-bold mb-3'>Chat Room : {room}</h1>
        <div className='w-full h-3/4 flex flex-col overflow-y-scroll'>
        {messages.map((msg, index) => (
         <div className={`w-full min-h-12 flex ${msg.username === username ? 'justify-end' : 'justify-start'}  mb-2`}>
          <div className={`w-2/4 flex flex-col  ${msg.username === username ? 'bg-green-200 text-right pr-2' : 'bg-blue-200 pl-2'}  break-words`}>
            <p className='text-sm font-bold pl-2'>{msg.username}</p>
            <p className='text-xl pl-2'>{msg.message}</p>
          </div>
        </div>
        ))}
        
        
        </div>
        <div className='w-full h-4 '>
          {isTyping && <div className='ml-2'>{userType} is typing...</div>}
        </div>
        <div className='w-full h-12 flex items-center mt-2'>
          <input
            className='w-3/4 h-full pl-2 mr-2 ml-2 border border-x-gray-400'
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onFocus={handleTyping}
            placeholder="Type your message..."
          />
          <button className='w-1/5 h-full bg-green-300 hover:bg-green-500' onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};
