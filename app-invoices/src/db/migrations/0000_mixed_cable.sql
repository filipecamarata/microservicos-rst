CREATE TABLE "invoices" (
	"id" text PRIMARY KEY NOT NULL,
	"orders_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
