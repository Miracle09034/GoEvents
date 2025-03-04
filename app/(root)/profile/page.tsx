import ProfilePage from '@/components/ProfilePage'; // Import the client component
import { getEventsByUser } from '@/lib/actions/event.actions';
import { getOrdersByUser } from '@/lib/actions/order.actions';
import { SearchParamProps } from '@/types';
import { auth } from '@clerk/nextjs/server';

export default async function Profile({ searchParams }: SearchParamProps) {
  const { user } = await auth(); // Get the Clerk userId
 console.log(user)
  if (!user) {
    throw new Error("User not authenticated");
  }



  // Pass the data to the client component
  return (
    <ProfilePage />
      
  );
}
