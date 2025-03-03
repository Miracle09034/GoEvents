import Home from '@/components/Home'; // Import the client component
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';

export default async function HomePage({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  // Fetch data on the server
  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  // Pass the data to the client component
  return <Home events={events} searchParams={searchParams} />;
}
