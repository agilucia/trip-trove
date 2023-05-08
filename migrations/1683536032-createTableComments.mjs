export async function up(sql) {
  await sql`
    CREATE TABLE comments (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      content varchar(200) NOT NULL,
      post_id integer REFERENCES posts (id) ON DELETE CASCADE,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      user_name varchar REFERENCES users (username) ON DELETE CASCADE
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE comments
  `;
}
