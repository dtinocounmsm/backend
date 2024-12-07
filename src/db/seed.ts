import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema/schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
const db = drizzle(pool, {
  schema,
}) as NodePgDatabase<typeof schema>;

async function seed() {
  await db
    .insert(schema.users)
    .values({
      name: 'Dennis',
      firstSurname: 'Tinoco',
      secondSurname: 'Rojas',
      email: 'djoelplay@gmail.com',
      password: '123456',
      address: 'Avenida Arequipa 123',
      countryCode: '+51',
      phone: '123456789',
      birthdate: '1990-01-01',
      gender: 'M',
      profileId: 1,
      active: true,
    })
    .returning();

  await db
    .insert(schema.users)
    .values({
      name: 'Jhonatan',
      firstSurname: 'Rivera',
      secondSurname: 'Carbajal',
      email: 'jrivera@gmail.com',
      password: '123456',
      address: 'Avenida Colonial 123',
      countryCode: '+51',
      phone: '987654321',
      birthdate: '1990-01-01',
      gender: 'M',
      profileId: 1,
      active: true,
    })
    .returning();
}

seed()
  .then(() => {
    console.log('seeded');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
