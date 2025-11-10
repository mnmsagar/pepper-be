CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"razorpay_order_id" varchar(256) NOT NULL,
	"razorpay_payment_id" varchar(256),
	"amount" numeric(10, 2) NOT NULL,
	"coins" integer NOT NULL,
	"user_id" integer NOT NULL,
	"status" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;