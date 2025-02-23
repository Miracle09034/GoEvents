// app/(root)/profile/page.tsx (Client Wrapper Component)
'use client';

import Profile from './Profile'; // Import the server component
import { useAuth } from '@clerk/nextjs';

export default function ProfilePage() {
  const user  = useAuth() // Use `currentUser` instead of `auth`
  const userId = user?.userId as string; // Access the user ID from the `currentUser` object
  console.log(userId)

  if (!userId) return <div>Loading...</div>; // Handle the case where userId is not available

  return <Profile userId={userId} />;
}