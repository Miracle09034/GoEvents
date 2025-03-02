'use client'

import EventForm from "@/components/shared/EventForm" 
import { useAuth } from "@clerk/nextjs";

const CreateEvent = () => { 
    const { user } = useAuth(); // Destructure `user` from `useAuth`

  // Log the user object for debugging
  console.log("User Object:", user);

  // Extract the `userId` from `public_metadata`
  const userId = user?.public_metadata?.userId as string;

  // Log the `userId` for debugging
  console.log("User ID from Public Metadata:", userId);
    
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
