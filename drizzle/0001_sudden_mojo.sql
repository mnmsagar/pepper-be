CREATE TABLE "coinrules" (
	"id" serial PRIMARY KEY NOT NULL,
	"number_of_coins" integer NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"description" varchar(512),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
