import dynamic from 'next/dynamic';
import Link from 'next/link';
import { getPosts } from '../../database/posts';

export const metadata = {
  title: 'TripTrove - Posts',
  description: 'Discover other peoples posts about their traveling stories.',
};

export default async function Posts() {
  const posts = await getPosts();
  return (
    <main>
      <div>
        <Link href="/">Home</Link>
        <h1>TripTrove</h1>
        <span>
          {posts.map((post) => {
            return (
              <div key={`post-${post.id}`}>
                <Link href={`/posts/${post.id}`}>
                  <div>{post.content}</div>
                </Link>
              </div>
            );
          })}
        </span>
      </div>
    </main>
  );
}
