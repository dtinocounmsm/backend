import { pgTable, serial, decimal, integer } from 'drizzle-orm/pg-core';

export const quotationDetail = pgTable('quotation_detail', {
  id: serial('id').primaryKey(),
  quotationId: integer('quotation_id').notNull(),
  productId: integer('product_id').notNull(),
  quantity: decimal('quantity'),
  price: decimal('price'),
  total: decimal('total'),
});
