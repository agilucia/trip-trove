'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  posts: Post[];
  userId: number;
};

export default function PostForm(props: Props) {
  const [posts, setPosts] = useState<Post[]>(props.posts);
  const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [content, setContent] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [error, setError] = useState<string>();

  const router = useRouter();
  return (
    <main>
      <div>
        <label htmlFor="post">Share your stories</label>
        <div>
          <input
            id="post"
            value={content}
            placeholder="Tell us about your travels"
            onChange={(event) => setContent(event.currentTarget.value)}
          />
          <button>Save</button>
        </div>
      </div>
    </main>
  );
}
