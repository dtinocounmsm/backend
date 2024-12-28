import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { DEFAULT_DATABASE_URL } from '@shared/infrastructure/constants';

export default defineConfig({
  schema: './src/db/schema/**.schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL,
  },
});
