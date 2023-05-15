import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
// import Image from 'next/image';
import { getPostsFromUser } from '../../database/posts';
import { getUserBySessionToken } from '../../database/users';
// import AddImage from './AddImage';
import PostForm from './PostForm';

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    userId: string;
  };
};

export const metadata = {
  title: 'TripTrove - Create a post',
  description: 'Create your own post and share your stories with others.',
};

export default async function CreatePosts({ params }: Props) {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return (
      NextResponse.json({ error: 'session token is not valid' }),
      redirect(`/login?returnTo=/createposts`)
    );
  }

  const posts = await getPostsFromUser(user.id);

  return (
    <main>
      <div>
        <Link href="/posts">Back to overview</Link>
        {/* <AddImage /> */}
        <PostForm posts={posts} userId={user.id} userName={user.username} />
      </div>
    </main>
  );
}
