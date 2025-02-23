// app/(root)/profile/Profile.tsx (Server Component)
import ProfilePage from '@/components/ProfilePAge'; // Import the client component
import { getEventsByUser } from '@/lib/actions/event.actions';
import { getOrdersByUser } from '@/lib/actions/order.actions';
import { IOrder } from '@/lib/database/models/order.model';
import { SearchParamProps  } from '@/types';

interface ProfileProps {
  userId: string;
  searchParams?: SearchParamProps['searchParams'];
}

export default async function Profile({ userId, searchParams }: ProfileProps) {
  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  // Fetch data
  const orders = await getOrdersByUser({ userId, page: ordersPage });
  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  // Pass data as props to the client component
  return (
   
    <ProfilePage
      ordersPage={ordersPage}
      eventsPage={eventsPage}
      orderedEvents={orderedEvents}
      organizedEvents={organizedEvents}
      totalPagesOrders={orders?.totalPages}
      totalPagesEvents={organizedEvents?.totalPages}
    />
   
  );
}