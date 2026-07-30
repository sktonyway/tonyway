import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {connectDB} from '@/lib/db';
import {User} from '@/lib/model';

export default async function SyncUserPage() {
  const user = await currentUser();

  // If no session exists, send back to login
  if (!user) {
    redirect('/sign-in');
  }

  await connectDB();

  // Upsert user details into MongoDB
  await User.findOneAndUpdate(
    { clerk_id: user.id },
    {
      clerk_id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      username: user.username || '',
      first_name: user.firstName || '',
      last_name: user.lastName || '',
      profile_pic: user.imageUrl,
    },
    { upsert: true, new: true }
  );

  // Redirect to the target dashboard or landing page
  redirect('/dashboard');
}
// This file is for sync users to my database runs everytime user signup or login