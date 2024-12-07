import {
  pgTable,
  serial,
  integer,
  timestamp,
  decimal,
} from 'drizzle-orm/pg-core';

export const quotations = pgTable('quotations', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id').notNull(),
  userId: integer('user_id').notNull(),
  date: timestamp('date').defaultNow(),
  total: decimal('total').notNull(),
  expirationDate: timestamp('expiration_date'),
  createdAt: timestamp('created_at').defaultNow(),
});
