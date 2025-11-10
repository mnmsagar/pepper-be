CREATE TABLE "reward_scheme" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"category" varchar(256) NOT NULL,
	"description" varchar(512) NOT NULL,
	"conditions" varchar(512) NOT NULL,
	"coin_reward" integer NOT NULL,
	"minimum_purchase" numeric(10, 2) NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"max_redemptions" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
