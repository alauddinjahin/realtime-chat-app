import { FC } from 'react';
import { Message } from '@/components/Message';
import { useChat } from '@/contexts/ChatContext';
import { useAuth } from '@/contexts/AuthContext';

const ChatWindow: FC = () => {
  const { messages, currentChatUser } = useChat();
  const { user } = useAuth();

  if (!currentChatUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 max-w-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No chat selected</h3>
          <p className="text-gray-500">Select a user from the list to start chatting</p>
        </div>
      </div>
    );
  }

  const filteredMessages = messages.filter(
    msg => 
      (msg.senderId === user?.id && msg.receiverId === currentChatUser.id) ||
      (msg.senderId === currentChatUser.id && msg.receiverId === user?.id)
  );

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 bg-white border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{currentChatUser.username}</h2>
        <p className="text-sm text-gray-500">
          {currentChatUser.isOnline ? 'Online' : 'Offline'}
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {filteredMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          filteredMessages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatWindow;