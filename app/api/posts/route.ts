import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createPost, Post } from '../../../database/posts';
import { getUserBySessionToken } from '../../../database/users';

const postType = z.object({
  content: z.string(),
  userName: z.string(),
  country: z.string(),
  city: z.string(),
});

export type PostsResponseBodyPost = { error: string } | { post: Post };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<PostsResponseBodyPost>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const body = await request.json();

  const result = postType.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Request body is missing a needed property' },
      { status: 400 },
    );
  }

  const newPost = await createPost(
    result.data.content,
    user.id,
    result.data.userName,
    result.data.country,
    result.data.city,
  );

  if (!newPost) {
    return NextResponse.json({ error: 'Post not created!' }, { status: 500 });
  }

  return NextResponse.json({ post: newPost });
}
