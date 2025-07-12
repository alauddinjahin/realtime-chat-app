import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/types/user';
import { Message } from '@/types/message';
import { useSocket } from '@/hooks/useSocket';

interface ChatContextType {
  users: User[];
  messages: Message[];
  currentChatUser: User | null;
  setCurrentChatUser: (user: User) => void;
  sendMessage: (content: string) => void;
  loading: boolean;
  error: string | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentChatUser, setCurrentChatUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const socket = useSocket();

  useEffect(() => {
    // Mock initial data
    const mockUsers: User[] = [
      { id: '1', username: 'john_doe', email: 'john@example.com', isOnline: true },
      { id: '2', username: 'jane_doe', email: 'jane@example.com', isOnline: true },
      { id: '3', username: 'bob_smith', email: 'bob@example.com', isOnline: false, lastSeen: new Date(Date.now() - 3600000) },
    ];
    
    setUsers(mockUsers);
    
    if (socket) {
      // Mock socket events
      socket.on('message', (newMessage: Message) => {
        setMessages(prev => [...prev, newMessage]);
      });
      
      socket.on('userStatus', (updatedUser: User) => {
        setUsers(prev => prev.map(user => 
          user.id === updatedUser.id ? updatedUser : user
        ));
      });
    }
    
    return () => {
      if (socket) {
        socket.off('message');
        socket.off('userStatus');
      }
    };
  }, [socket]);

  const sendMessage = (content: string) => {
    if (!currentChatUser) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      senderId: '1', // Mock current user ID
      receiverId: currentChatUser.id,
      timestamp: new Date(),
      status: 'pending'
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    if (socket) {
      socket.emit('sendMessage', newMessage);
    }
    
    // Mock message delivery
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);
  };

  return (
    <ChatContext.Provider value={{ 
      users, 
      messages, 
      currentChatUser, 
      setCurrentChatUser, 
      sendMessage, 
      loading, 
      error 
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};