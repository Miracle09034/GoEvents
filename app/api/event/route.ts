'use server'

// app/api/event/route.ts
import { NextResponse } from 'next/server';
import { createEvent, updateEvent } from '@/lib/actions/event.actions';
import { z } from 'zod';
import { eventFormSchema } from '@/lib/validator';
import { useUploadThing } from '@/lib/uploadthing';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const values = Object.fromEntries(formData.entries());

    // Convert string values back to their original types
    const validatedData = eventFormSchema.parse({
      ...values,
      startDateTime: new Date(values.startDateTime as string),
      endDateTime: new Date(values.endDateTime as string),
      isFree: values.isFree === 'true', // Convert string back to boolean
      price: String(values.price), // Ensure price is a string
    });

    const { type, userId, eventId } = validatedData;
    const files = formData.getAll('files') as File[];

    let uploadedImageUrl = validatedData.imageUrl;

    const { startUpload } = useUploadThing('imageUploader');

    if (files && files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) throw new Error('Image upload failed');
      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === 'Create') {
      const newEvent = await createEvent({
        event: { ...validatedData, imageUrl: uploadedImageUrl },
        userId,
        path: '/profile',
      });
      return NextResponse.json(newEvent, { status: 201 });
    }

    if (type === 'Update') {
      if (!eventId) throw new Error('Event ID is required for update');
      const updatedEvent = await updateEvent({
        userId,
        event: { ...validatedData, imageUrl: uploadedImageUrl, _id: eventId },
        path: `/events/${eventId}`,
      });
      return NextResponse.json(updatedEvent, { status: 200 });
    }

    throw new Error('Invalid type');
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}