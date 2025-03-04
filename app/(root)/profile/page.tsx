import { auth } from '@clerk/nextjs/server';
import ProfilePage from '@/components/ProfilePage'; // Import the client component
import { getEventsByUser } from '@/lib/actions/event.actions';
import { getOrdersByUser } from '@/lib/actions/order.actions';
import { SearchParamProps } from '@/types';

export default async function Profile({ searchParams }: SearchParamProps) {
  // Get the authenticated user object
  const { user } = await auth();
  console.log(user)
  if (!user) {
    console.log("User not authenticated");
  }

  // Extract the `userId` from `publicMetadata`
  const publicMetadataUserId = user.publicMetadata.userId as string;

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




