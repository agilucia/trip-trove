import { cookies } from 'next/headers';
// import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import {
  getUserBySessionToken,
  getUserByUsername,
} from '../../../database/users';
import { profileNotFoundMetadata } from './not-found';

export const dynamic = 'force-dynamic';

type Props = {
  params: { username: string; userId: number; imageId: number };
};

export async function generateMetadata(props: Props) {
  const user = await getUserByUsername(props.params.username);

  if (!user) {
    return profileNotFoundMetadata;
  }

  return {
    title: `TripTrove - ${user.username}`,
    description: `Find out about ${user.username} and check out their posts`,
    icons: {
      shortcut: '/favicon.svg',
    },
  };
}

export default async function UserProfile(props: Props) {
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const currentUser = token && (await getUserBySessionToken(token.value));

  if (!currentUser) {
    return (
      NextResponse.json({ error: 'session token is not valid' }),
      redirect(`/login?returnTo=/locations`)
    );
  }

  const user = await getUserByUsername(props.params.username);

  if (!user) {
    notFound();
  }

  return (
    <main>
      <div>
        <div>
          <div>
            <h1>
              <b>
                {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
              </b>
            </h1>
            <br />
            <p>
              <b>About me:</b>
            </p>
            {/* <span>
              {bios.map((bio) => {
                return <div key={`bio-${bio.userId}`}>{bio.content}</div>;
              })}
            </span> */}
            <br />
          </div>
          {/* <h2 className="text-xl text-white ">My pictures</h2> */}
        </div>
      </div>
    </main>
  );
}
