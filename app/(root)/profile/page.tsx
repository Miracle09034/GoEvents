import ProfilePage from '@/components/ProfilePage'; // Import the client component
import { getEventsByUser } from '@/lib/actions/event.actions';
import { getOrdersByUser } from '@/lib/actions/order.actions';
import { SearchParamProps } from '@/types';
import { auth } from '@clerk/nextjs/server';
import User from '@/lib/database/models/user.model'; // Import your User model

export default async function Profile({ searchParams }: SearchParamProps) {
  const { userId } = await auth(); // Get the Clerk userId
 console.log(userId)
  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Fetch the user from the database using the userId
  const user = await User.findOne({ clerkId: userId });
console.log("User from DB:", user);

if (!user) {
  throw new Error("User not found in database");
}

// Extract the MongoDB _id (ObjectId) of the user
  const _Id = user._id;
  console.log("User ID (ObjectId):", _Id);

  // Fetch orders and events for the user
  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ _Id, page: ordersPage });
  const organizedEvents = await getEventsByUser({ _Id, page: eventsPage });
  console.log(organizedEvents)
  // Extract ordered events from orders
  const orderedEvents = orders?.data.map((order) => order.event) || [];

  // Pass the data to the client component
  return (
    <ProfilePage
      orderedEvents={orderedEvents}
      organizedEvents={organizedEvents?.data}
      ordersPage={ordersPage}
      eventsPage={eventsPage}
      totalPagesOrders={orders?.totalPages}
      totalPagesEvents={organizedEvents?.totalPages}
    />


  )
}
