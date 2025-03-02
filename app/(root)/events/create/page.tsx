'use client'

import EventForm from "@/components/shared/EventForm" 
import { useAuth } from "@clerk/nextjs";

const CreateEvent = () => { 
    const { userId: clerkUserId, user } = useAuth(); // Destructure `user` from `useAuth`

    // Extract the `userId` from `public_metadata`
    const userId = user?.publicMetadata?.userId as string;

    console.log(userId); // Log the `userId` from `public_metadata`
    
    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-7 md:py-13 mt-20 sm:mt-10"> 
                <h3 className="wrapper h3-bold text-center sm:text-left">Create Event</h3> 
            </section> 
            
            <div className="wrapper my-8"> 
                <EventForm userId={userId} type="Create" /> 
            </div> 
        </>
    );
};

export default CreateEvent;
