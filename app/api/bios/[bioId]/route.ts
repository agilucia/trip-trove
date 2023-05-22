import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  Bio,
  deleteBioById,
  getBioById,
  updateBioById,
} from '../../../../database/bios';
import { getUserBySessionToken } from '../../../../database/users';

const bioType = z.object({
  content: z.string(),
});

export type BioResponseBodyGet = { error: string } | { bio: Bio };

export type BioResponseBodyPut = { error: string } | { bio: Bio };

export type BioResponseBodyDelete = { error: string } | { bio: Bio };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<BioResponseBodyGet>> {
  const bioId = Number(params.bioId);

  if (!bioId) {
    return NextResponse.json(
      {
        error: 'Bio id is not valid',
      },
      { status: 400 },
    );
  }

  const singleBio = await getBioById(bioId);

  if (!singleBio) {
    return NextResponse.json({ error: 'Bio not found' }, { status: 404 });
  }

  return NextResponse.json({ bio: singleBio });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<BioResponseBodyDelete>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const bioId = Number(params.bioId);
  const singleBioCheck = await getBioById(bioId);

  if (!bioId) {
    return NextResponse.json({ error: 'Bio id is not valid' }, { status: 404 });
  }

  if (singleBioCheck && singleBioCheck.userId === user.id) {
    const singleBio = await deleteBioById(bioId);

    if (!singleBio) {
      return NextResponse.json({ error: 'Bio not found' }, { status: 404 });
    }

    return NextResponse.json({ bio: singleBio });
  } else {
    return NextResponse.json(
      { error: 'You cannot delete this bio!' },
      { status: 403 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<BioResponseBodyPut>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const bioId = Number(params.bioId);
  const singleBioCheck = await getBioById(bioId);

  if (!bioId) {
    return NextResponse.json({ error: 'Bio id is not valid' }, { status: 400 });
  }

  const body = await request.json();

  const result = bioType.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request body is missing a needed property',
      },
      { status: 400 },
    );
  }

  if (singleBioCheck && singleBioCheck.userId === user.id) {
    const newBio = await updateBioById(bioId, result.data.content);

    if (!newBio) {
      return NextResponse.json({ error: 'Bio not found' }, { status: 404 });
    }

    return NextResponse.json({ bio: newBio });
  } else {
    return NextResponse.json(
      { error: 'You cannot edit this bio!' },
      { status: 403 },
    );
  }
}
