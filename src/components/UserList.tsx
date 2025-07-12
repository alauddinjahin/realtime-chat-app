import { useChat } from '../contexts/ChatContext';

const UserList = () => {
  const { users, currentChat, selectUser } = useChat();

  return (
    <div className="w-1/4 border-r border-gray-200 bg-gray-50">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Users</h2>
      </div>
      <div className="overflow-y-auto h-full">
        {users.map(user => (
          <div
            key={user.id}
            onClick={() => selectUser(user)}
            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${
              currentChat?.id === user.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user.username}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;