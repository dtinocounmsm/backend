import {
  pgTable,
  serial,
  text,
  char,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  firstSurname: text('first_surname').notNull(),
  secondSurname: text('second_surname').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  address: text('address').notNull(),
  countryCode: text('country_code').notNull(),
  phone: text('phone').notNull(),
  birthdate: text('birthdate').notNull(),
  gender: char('gender').notNull(),
  profileId: integer('profile_id').notNull(),
  active: boolean('active').notNull(),
});
