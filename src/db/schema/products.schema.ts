import {
  pgTable,
  serial,
  text,
  boolean,
  decimal,
  integer,
} from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  purchasePrice: decimal('purchase_price').notNull().default('0'),
  sellingPrice: decimal('selling_price').notNull().default('0'), // Typo in the schema: salePrice -> sellingPrice
  imageUrl: text('image_url').notNull(),
  stock: integer('stock').notNull(),
  active: boolean('active').notNull(),
});
