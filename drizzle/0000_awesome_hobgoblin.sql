CREATE TABLE "coins" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"total_balance" numeric(10, 2) NOT NULL,
	"user_id" integer NOT NULL,
	"transaction_id" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "coins_transaction_id_unique" UNIQUE("transaction_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" text NOT NULL,
	"type" text NOT NULL,
	"password" varchar(256) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"address" varchar(256) NOT NULL,
	"city" varchar(256) NOT NULL,
	"state" varchar(256) NOT NULL,
	"country" varchar(256) NOT NULL,
	"zip" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "coins" ADD CONSTRAINT "coins_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;