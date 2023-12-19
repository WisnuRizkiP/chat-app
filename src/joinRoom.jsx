// src/components/JoinRoom.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinRoom = () => {
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    // You can add additional validation if needed
    if (room && username) {
      navigate(`/chat?room=${room}&username=${username}`);
    } else {
      alert('Please enter room and username');
    }
  };

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='w-2/4 h-3/4  flex flex-col items-center justify-center border border-gray-500 rounded-lg'>
        <h1 className='font-bold text-3xl text-center mb-4'>Join Room</h1>
        <div className='w-2/4 h-10  flex items-center '>
          <p className='text-xl mr-3 w-2/6'>Room</p>
          <input className='h-8 border border-gray-400 rounded-md pl-3' type="text" value={room} onChange={(e) => setRoom(e.target.value)} />
        </div>

        <div className='w-2/4 h-10  flex items-center '>
          <p className='text-xl mr-3 w-2/6'>Username</p>
          <input className='h-8 border border-gray-400 rounded-md pl-3' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>

        </div>
        {/* <label>
          Room:
          <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br /> */}
        <button className='w-1/4 h-10 bg-green-200 hover:bg-green-500 rounded-md mt-3 font-bold' onClick={handleJoin}>Join Chat</button>
      </div>
      
    </div>
  );
};

export default JoinRoom;
