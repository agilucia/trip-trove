export async function up(sql) {
  await sql`
    CREATE TABLE bios (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      content varchar(1000) NOT NULL,
      user_id integer REFERENCES users (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE bios
  `;
}
