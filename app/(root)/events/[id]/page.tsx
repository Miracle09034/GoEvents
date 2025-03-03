import EventDetails from '@/components/EventDetails'; // Import the client component
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';

export default async function EventDetailsPage({ params: { id }, searchParams }: SearchParamProps) {
  // Ensure `id` is a string
  if (typeof id !== 'string') {
    throw new Error('Invalid event ID');
  }

  // Fetch the event data
  const event = await getEventById(id);

  // Fetch related events
  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  // Pass the data to the client component
  return <EventDetails event={event} relatedEvents={relatedEvents} searchParams={searchParams} />;
}
