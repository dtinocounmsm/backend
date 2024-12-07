CREATE TABLE IF NOT EXISTS "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"first_surname" text NOT NULL,
	"second_surname" text NOT NULL,
	"document_type" text NOT NULL,
	"document_number" text NOT NULL,
	"email" text NOT NULL,
	"address" text NOT NULL,
	"country_code" text NOT NULL,
	"phone" text NOT NULL,
	"mobile" text NOT NULL,
	"birthdate" text,
	"gender" char NOT NULL,
	"active" boolean NOT NULL,
	CONSTRAINT "customers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"purchase_price" numeric NOT NULL,
	"selling_price" numeric NOT NULL,
	"image_url" text NOT NULL,
	"active" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"metadata" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quotation_detail" (
	"id" serial PRIMARY KEY NOT NULL,
	"quotation_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" numeric,
	"price" numeric,
	"total" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quotations" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"date" timestamp DEFAULT now(),
	"total" numeric NOT NULL,
	"expiration_data" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"first_surname" text NOT NULL,
	"second_surname" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"address" text NOT NULL,
	"country_code" text NOT NULL,
	"phone" text NOT NULL,
	"birthdate" text NOT NULL,
	"gender" char NOT NULL,
	"profile_id" integer NOT NULL,
	"active" boolean NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
