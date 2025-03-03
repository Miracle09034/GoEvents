import { GetServerSideProps } from 'next';
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';

interface EventDetailsPageProps {
  event: any;
  relatedEvents: any;
  searchParams: SearchParamProps;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, query } = context;
  const eventId = params.id as string;

  const event = await getEventById(eventId);
  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: query.page as string,
  });

  return {
    props: {
      event,
      relatedEvents,
      searchParams: query,
    },
  };
};

export default EventDetailsPage;
