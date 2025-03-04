'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Collection from '@/components/shared/Collection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProfilePageProps {
  ordersPage: number;
  eventsPage: number;
}

interface Event {
  id: string;
  name: string;
  date: string;
}

interface OrdersResponse {
  orderedEvents: Event[];
  organizedEvents: Event[];
  totalPagesOrders: number;
  totalPagesEvents: number;
}

const ProfilePage = ({ ordersPage, eventsPage }: ProfilePageProps) => {
  const { user } = useUser();
  const [data, setData] = useState<OrdersResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const res = await fetch(`/api/profile-data`, {
          method: 'POST',
          body: JSON.stringify({ userId: user.id, ordersPage, eventsPage }),
          headers: { 'Content-Type': 'application/json' },
        });

        const result = await res.json();
        setData(result);
      }
    };

    fetchData();
  }, [user, ordersPage, eventsPage]);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={data.orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={data.totalPagesOrders}
        />
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={data.organizedEvents}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={data.totalPagesEvents}
        />
      </section>
    </>
  );
};

export default ProfilePage;
