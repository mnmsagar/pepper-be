import { pgEnum } from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum("user_type", ["admin", "member", "partner"]);
export const coinTypeEnum = pgEnum("coin_type", ["credit", "debit"]);