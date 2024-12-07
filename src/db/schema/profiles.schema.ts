import { pgTable, serial, text, jsonb } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  metadata: jsonb('metadata').notNull(),
});
