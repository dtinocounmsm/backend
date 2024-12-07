import { pgTable, serial, text, char, boolean } from 'drizzle-orm/pg-core';

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  firstSurname: text('first_surname').notNull(),
  secondSurname: text('second_surname').notNull(),
  documentType: text('document_type').notNull(),
  documentNumber: text('document_number').notNull(),
  email: text('email').unique().notNull(),
  address: text('address').notNull(),
  countryCode: text('country_code').notNull(),
  phone: text('phone').notNull(),
  mobile: text('mobile').notNull(),
  birthdate: text('birthdate'),
  gender: char('gender').notNull(),
  active: boolean('active').notNull(),
});
