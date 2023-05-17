import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBioByUserId } from '../../../../database/bios';
import { getUserByUsername } from '../../../../database/users';
import BioForm from './BioForm';

export const dynamic = 'force-dynamic';

type Props = {
  params: { username: string; userId: number };
};

export const metadata = {
  title: 'TripTrove - Edit bio info',
  description: 'Edit the information in your bio',
};

export default async function BioInfos({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const bios = await getBioByUserId(user.id);

  return (
    <main>
      <div>
        <Link href={`/profile/${user.username}`}>Back to profile</Link>
        <BioForm bios={bios} userId={user.id} />
      </div>
    </main>
  );
}
