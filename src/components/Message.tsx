import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

const Message = ({ message }: any) => {
  const { user } = useAuth();
  const isCurrentUser = message?.senderId === user?.id;

  return (
    <div className={`flex mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        <div className="text-sm">{message.content}</div>
        <div className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {format(new Date(message.timestamp), 'HH:mm')}
          {message.status === 'pending' && ' • Sending...'}
        </div>
      </div>
    </div>
  );
};

export default Message;