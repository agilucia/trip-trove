import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'TripTrove',
  description:
    "Share your own traveling experience and discover other people's stories.",
};

export default function Home() {
  return (
    <main>
      <div>
        <h1>TripTrove</h1>
        <p>
          Share your own traveling experiences and discover other people's
          stories in the trip trove!
        </p>
        <Link href="/posts">Get Started</Link>
      </div>
    </main>
  );
}
