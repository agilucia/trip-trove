import dynamic from 'next/dynamic';
import Link from 'next/link';

export const metadata = {
  title: 'TripTrove - Posts',
  description: 'Discover other peoples posts about their traveling stories.',
};

export default async function Posts() {
  return (
    <main>
      <div>
        <Link href="/">Home</Link>
        <h1>TripTrove</h1>
      </div>
    </main>
  );
}
