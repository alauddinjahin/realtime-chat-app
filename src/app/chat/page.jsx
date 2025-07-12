'use client';

import { ChatProvider } from '@/contexts/ChatContext';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import UserList from '@/components/UserList';
import ChatWindow from '@/components/ChatWindow';
import MessageInput from '@/components/MessageInput';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      // redirect('/login');
      router.push("/login")

    }
  }, [user, isLoading]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <ChatProvider>
      <div className="flex h-screen bg-gray-100">
        <UserList />
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatWindow />
          <MessageInput />
        </div>
      </div>
    </ChatProvider>
  );
}