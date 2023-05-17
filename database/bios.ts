import { cache } from 'react';
import { sql } from './connect';

export type Bio = {
  id: number;
  content: string;
  userId: number | null;
};

// get single bio
export const getBioById = cache(async (id: number) => {
  const [bio] = await sql<Bio[]>`
    SELECT
      *
    FROM
      bios
    WHERE
      id = ${id}
  `;
  return bio;
});

// get bio for single user
export const getBioByUserId = cache(async (userId: number) => {
  const bios = await sql<Bio[]>`
    SELECT
      *
    FROM
      bios
    WHERE
      bios.user_id = ${userId}
  `;
  return bios;
});

export const createBio = cache(async (content: string, userId: number) => {
  const [bio] = await sql<Bio[]>`
    INSERT INTO bios
      (content, user_id)
    VALUES
      (${content}, ${userId})
    RETURNING *
  `;
  return bio;
});

export const updateBioById = cache(async (id: number, content: string) => {
  const [bio] = await sql<Bio[]>`
    UPDATE
      bios
    SET
      content = ${content}
    WHERE
      id = ${id}
    RETURNING *
  `;
  return bio;
});

export const deleteBioById = cache(async (id: number) => {
  const [bio] = await sql<Bio[]>`
    DELETE FROM
      bios
    WHERE
      id = ${id}
    RETURNING *
  `;
  return bio;
});
