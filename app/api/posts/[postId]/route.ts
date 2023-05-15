import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deletePostById,
  getPostById,
  Post,
  updatePostById,
} from '../../../../database/posts';
import { getUserBySessionToken } from '../../../../database/users';

const postType = z.object({
  content: z.string(),
});

export type PostResponseBodyGet = { error: string } | { post: Post };

export type PostResponseBodyPut = { error: string } | { post: Post };

export type PostResponseBodyDelete = { error: string } | { post: Post };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<PostResponseBodyGet>> {
  const postId = Number(params.postId);

  if (!postId) {
    return NextResponse.json(
      { error: 'Post id is not valid' },
      { status: 400 },
    );
  }

  const singlePost = await getPostById(postId);

  if (!singlePost) {
    return NextResponse.json({ error: 'Post not found' }, { status: 400 });
  }

  return NextResponse.json({ post: singlePost });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<PostResponseBodyDelete>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const postId = Number(params.postId);
  const singlePostCheck = await getPostById(postId);

  if (!postId) {
    return NextResponse.json(
      { error: 'Post id is not valid' },
      { status: 404 },
    );
  }

  if (singlePostCheck && singlePostCheck.userId === user.id) {
    const singlePost = await deletePostById(postId);

    if (!singlePost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post: singlePost });
  } else {
    return NextResponse.json(
      { error: 'You cannot delete this comment!' },
      { status: 403 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<PostResponseBodyPut>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: ' session token is not valid' });
  }

  const postId = Number(params.postId);
  const singlePostCheck = await getPostById(postId);

  if (!postId) {
    return NextResponse.json(
      { error: 'Post id is not valid' },
      { status: 400 },
    );
  }

  const body = await request.json();

  const result = postType.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Request body is missing a needed property' },
      { status: 400 },
    );
  }

  if (singlePostCheck && singlePostCheck.userId === user.id) {
    const newPost = await updatePostById(postId, result.data.content);

    if (!newPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post: newPost });
  } else {
    return NextResponse.json(
      { error: 'You cannot edit this post!' },
      { status: 403 },
    );
  }
}
