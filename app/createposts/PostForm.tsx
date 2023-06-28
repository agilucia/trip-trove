'use client';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Post } from '../../database/posts';

type Props = {
  posts: Post[];
  userId: number;
  userName: string;
};

export default function PostForm(props: Props) {
  const [posts, setPosts] = useState<Post[]>(props.posts);
  const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [content, setContent] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [error, setError] = useState<string>();

  // const router = useRouter();

  return (
    <main>
      <label htmlFor="post">Share your stories</label>
      <div>
        <input
          id="city"
          value={city}
          placeholder="City"
          onChange={(event) => setCity(event.currentTarget.value)}
        />
        <br />
        <input
          id="country"
          value={country}
          placeholder="Country"
          onChange={(event) => setCountry(event.currentTarget.value)}
        />
        <br />
        <input
          id="post"
          value={content}
          placeholder="Tell us about your travels"
          onChange={(event) => setContent(event.currentTarget.value)}
        />
        <button
          onClick={async () => {
            const userName = props.userName;
            const response = await fetch('/api/posts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                city,
                country,
                content,
                userName,
              }),
            });

            const data = await response.json();

            if (data.error) {
              setError(data.error);
              return;
            }

            setPosts([...posts, data.post]);
            setCity('');
            setCountry('');
            setContent('');
          }}
        >
          Save
        </button>
      </div>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        {posts.map((post) => (
          <div key={`post-${post.id}`}>
            <div>
              {post.userName ? (
                <Link href={`/profile/${post.userName}`}>
                  <b>
                    {post.userName.charAt(0).toUpperCase() +
                      post.userName.slice(1)}
                    :{' '}
                  </b>
                </Link>
              ) : (
                ''
              )}
            </div>
            {idOnEditMode !== post.id ? (
              post.content
            ) : (
              <input
                value={editContent}
                onChange={(event) => setEditContent(event.currentTarget.value)}
              />
            )}
            <div>
              {props.userId === post.userId ? (
                <button
                  onClick={async () => {
                    const response = await fetch(`/api/posts/${post.id}`, {
                      method: 'DELETE',
                    });

                    const data = await response.json();

                    if (data.error) {
                      setError(data.error);
                      return;
                    }

                    setPosts(
                      posts.filter(
                        (postOnState) => postOnState.id !== data.post.id,
                      ),
                    );
                  }}
                >
                  X
                </button>
              ) : (
                <div />
              )}

              {props.userId === post.userId && idOnEditMode !== post.id ? (
                <button
                  onClick={() => {
                    setIdOnEditMode(post.id);
                    setEditContent(post.content);
                    console.log('test');
                  }}
                >
                  edit
                </button>
              ) : (
                <div />
              )}

              {props.userId === post.userId && idOnEditMode === post.id ? (
                <button
                  onClick={async () => {
                    const response = await fetch(`/api/posts/${post.id}`, {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        content: editContent,
                      }),
                    });

                    const data = await response.json();

                    if (data.error) {
                      setError(data.error);
                      return;
                    }

                    setIdOnEditMode(undefined);

                    setPosts(
                      posts.map((postOnState) => {
                        return postOnState.id !== data.post.id
                          ? postOnState
                          : data.post;
                      }),
                    );
                  }}
                >
                  save
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
