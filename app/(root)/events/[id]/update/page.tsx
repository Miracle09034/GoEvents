import EventForm from "@/components/shared/EventForm"

import { getEventById } from "@/lib/actions/event.actions"

import { useAuth } from "@clerk/nextjs";
import { SearchParamProps } from '@/types';

const UpdateEvent = async ({ params: { id } }: SearchParamProps ) => {

    const { userId: clerkUserId, user } = useAuth(); // Destructure `user` from `useAuth`

    // Extract the `userId` from `public_metadata`
    const userId = user?.publicMetadata?.userId as string;

    console.log(userId); // Log the `userId` from `public_metadata`
    
    const event = await getEventById(id)

    return (

        <>

            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 mt-8">

                <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>

            </section>

            <div className="wrapper my-8">

                <EventForm

                    type="Update"

                    event={event}

                    eventId={event._id}

                    userId={userId}

                />

            </div>

        </>

    )

}

export default UpdateEvent

