import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function Home() {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('auth-token');
  
  if (isAuthenticated) {
    redirect('/chat');
  } else {
    redirect('/login');
  }
}