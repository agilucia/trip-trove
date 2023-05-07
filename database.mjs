import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

const sql = postgres();

console.log(
  await sql`
  SELECT * FROM locations
  `,
);

// This is just an example
await sql.end();
