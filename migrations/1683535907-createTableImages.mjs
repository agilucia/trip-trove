export async function up(sql) {
  await sql`
CREATE TABLE images (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  image_url varchar(500),
  caption varchar(1000),
  user_id integer REFERENCES users (id) ON DELETE CASCADE,
  post_id integer REFERENCES posts (id) ON DELETE CASCADE
)
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE images
  `;
}
