import './globals.css';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';

export const metadata = {
  title: {
    default: 'TripTrove',
  },
  manifest: '/manifest.json',
};

type Props = {
  children: React.ReactNode;
};

export const dynamic = 'force-dynamic';

export default async function RootLayout(props: Props) {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <html lang="en">
      <head />
      <body>
        <header>
          <div>
            <Link href="/">HOME</Link>
            <br />
            <Link href="/posts">POSTS</Link>
            <br />
            <Link href="/createposts">Create a new post</Link>
            <br />
            {user ? (
              <>
                <Link href={`/profile/${user.username}`}>
                  {user.username.charAt(0).toUpperCase() +
                    user.username.slice(1)}
                </Link>
                <br />
                <Link href="/logout" prefetch={false}>
                  logout
                </Link>
              </>
            ) : (
              <>
                <Link href="/register">register</Link>
                <br />

                <Link href="/login">login</Link>
              </>
            )}
          </div>
        </header>
        {props.children}
      </body>
    </html>
  );
}
