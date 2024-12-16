ALTER TABLE "quotations" RENAME COLUMN "expiration_data" TO "expiration_date";--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "active" SET DEFAULT TRUE;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "purchase_price" SET DEFAULT '0';--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "selling_price" SET DEFAULT '0';