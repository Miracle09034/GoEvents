import { Webhook } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions';
import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Get the Clerk webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const headerPayload = headers();
  const clerkSignature = headerPayload.get('Clerk-Webhook-Signature');

  // If there's no signature, error out
  if (!clerkSignature) {
    return new Response('Error occurred -- no Clerk signature header', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify the webhook signature using Clerk's Webhook class
  try {
    const wh = new Webhook(WEBHOOK_SECRET);
    const evt = wh.verify(body, clerkSignature) as WebhookEvent;

    // Handle the event
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === 'user.created') {
      const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

      const user = {
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username!,
        firstName: first_name!,
        lastName: last_name!,
        photo: image_url,
      };

      const newUser = await createUser(user);
      console.log('This is the new user:', newUser);

      if (newUser) {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser._id,
          },
        });
      }

      return NextResponse.json({ message: 'OK', user: newUser });
    }

    if (eventType === 'user.updated') {
      const { id, image_url, first_name, last_name, username } = evt.data;

      const user = {
        firstName: first_name!,
        lastName: last_name!,
        username: username!,
        photo: image_url,
      };

      const updatedUser = await updateUser(id, user);
      return NextResponse.json({ message: 'OK', user: updatedUser });
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data;
      const deletedUser = await deleteUser(id!);
      return NextResponse.json({ message: 'OK', user: deletedUser });
    }

    return new Response('', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }
}
