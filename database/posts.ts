import { cache } from 'react';
import { sql } from './connect';

export type Post = {
  id: number;
  content: string;
  userId: number | null;
  userName: string | null;
  country: string | null;
  city: string | null;
  postingDate: Date;
};

// get a single post
export const getPostById = cache(async (id: number) => {
  const [post] = await sql<Post[]>`
    SELECT
      *
    FROM
      posts
    WHERE
      id = ${id}
  `;
  return post;
});

// get all posts from a user
export const getPostsFromUser = cache(async (userId: number) => {
  const posts = await sql<Post[]>`
    SELECT
      *
    FROM
      posts
    WHERE
      posts.user_id = ${userId}
  `;
  return posts;
});

// get all posts for a city
export const getPostsForCity = cache(async (city: string) => {
  const posts = await sql<Post[]>`
    SELECT
      *
    FROM
      posts
    WHERE
      posts.city = ${city}
  `;
  return posts;
});

// get all posts for a country
export const getPostsForCountry = cache(async (country: string) => {
  const posts = await sql<Post[]>`
    SELECT
      *
    FROM
      posts
    WHERE
      posts.country = ${country}
  `;
  return posts;
});

// create a post
export const createPost = cache(
  async (
    content: string,
    userId: number,
    userName: string,
    country: string,
    city: string,
    postingDate: Date,
  ) => {
    const [post] = await sql<Post[]>`
    INSERT INTO posts
      (content, user_id, user_name, country, city, posting_date)
    VALUES
      (${content}, ${userId}, ${userName}, ${country}, ${city}, ${postingDate})
    RETURNING *
  `;
    return post;
  },
);

// update a post
export const updatePostById = cache(async (id: number, content: string) => {
  const [post] = await sql<Post[]>`
    UPDATE
      posts
    SET
      content = ${content}
    WHERE
      id = ${id}
    RETURNING *
  `;
  return post;
});

// delete a post
export const deletePostById = cache(async (id: number) => {
  const [post] = await sql<Post[]>`
    DELETE FROM
      posts
    WHERE
      id = ${id}
    RETURNING *
  `;
  return post;
});
