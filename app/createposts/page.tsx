import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddImage from './AddImage';
import PostForm from './PostForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'TripTrove - Create a post',
  description: 'Create your own post and share your stories with others.'
};

export default async function CreatePosts({params}: Props) {
  return(
    <main>
      <div>
        <Link href="/posts">Back to overview</Link>
        <AddImage />
        <PostForm />
      </div>
    </main>
  )
}
