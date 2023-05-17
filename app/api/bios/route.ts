import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Bio, createBio } from '../../../database/bios';
import { getUserBySessionToken } from '../../../database/users';

const bioType = z.object({
  content: z.string(),
});

export type BioResponseBodyPost = { error: string } | { bio: Bio };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<BioResponseBodyPost>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sesstionToken');

  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const body = await request.json();

  const result = bioType.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Request body is missing the needed property content' },
      { status: 400 },
    );
  }

  const newBio = await createBio(result.data.content, user.id);

  if (!newBio) {
    return NextResponse.json({ error: 'Bio not created!' }, { status: 500 });
  }

  return NextResponse.json({ bio: newBio });
}
