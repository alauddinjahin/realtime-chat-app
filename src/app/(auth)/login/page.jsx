"use client"
import AuthForm from '@/components/AuthForm';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/utils/auth';

export default function LoginPage() {
  const session = getServerSession();
  
  if (session) {
    redirect('/chat');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm />
    </div>
  );
}