import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // In a real app, you would connect to your backend server
    // const socketInstance = io('http://localhost:3001');
    
    // For mock purposes, we'll just create a socket instance without connecting
    const socketInstance = io('', { autoConnect: false });
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};