import { cookies } from 'next/headers';
import ProfilePage from '@/components/ProfilePage'; // Import the client component
import { getEventsByUser } from '@/lib/actions/event.actions';
import { getOrdersByUser } from '@/lib/actions/order.actions';
import { SearchParamProps } from '@/types';

export default async function Profile({ searchParams }: SearchParamProps) {
  // Extract the session token from cookies
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('__session')?.value;

  if (!sessionToken) {
    throw new Error("Session token not found");
  }

  // Fetch the user object from the Clerk API
  const response = await fetch('https://api.clerk.com/v1/users/me', {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error("API Error:", errorResponse);
    throw new Error("Failed to fetch user data");
  }

  const user = await response.json();
  console.log("User Object:", user);

  // Extract the `userId` from `public_metadata`
  const publicMetadataUserId = user.public_metadata.userId as string;

  // Fetch orders and events for the user
  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId: publicMetadataUserId, page: ordersPage });
  const organizedEvents = await getEventsByUser({ userId: publicMetadataUserId, page: eventsPage });

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
  );
}
