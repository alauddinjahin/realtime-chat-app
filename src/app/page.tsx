"use client"
import { redirect } from 'next/navigation';
// import { cookies } from 'next/headers';

export default function Home() {
  // const cookieStore = cookies();
  const isAuthenticated = localStorage.getItem("user")
  
  if (isAuthenticated) {
    redirect('/chat');
  } else {
    redirect('/login');
  }
}