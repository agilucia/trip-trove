export async function up(sql) {
  await sql`
    CREATE TABLE posts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      content varchar(50000) NOT NULL,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      user_name varchar REFERENCES users (username) ON DELETE CASCADE,
      country varchar(100),
      city varchar(100)
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE posts
  `;
}
