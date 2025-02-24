import EventForm from "@/components/shared/EventForm"

import { getEventById } from "@/lib/actions/event.actions"

import { useAuth } from "@clerk/nextjs";
import { SearchParamProps } from '@/types';

const UpdateEvent = async ({ params: { id } }: SearchParamProps ) => {

    const user = useAuth(); // Use `currentUser` instead of `auth`
    const userId = user?.userId as string; // Access the user ID from the `currentUser` object


    const event = await getEventById(id)

    return (

        <>

            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">

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

