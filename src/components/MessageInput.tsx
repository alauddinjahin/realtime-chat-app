import { FC, useState, KeyboardEvent } from 'react';
import { useChat } from '@/contexts/ChatContext';

const MessageInput: FC = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, currentChatUser } = useChat();

  const handleSendMessage = () => {
    if (message?.trim() && currentChatUser) {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!currentChatUser) {
    return (
      <div className="p-4 bg-gray-100 text-center text-gray-500">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div className="flex items-center">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:border-blue-500"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 focus:outline-none"
          onClick={handleSendMessage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;