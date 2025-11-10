import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  numeric,
  integer,
  boolean
} from 'drizzle-orm/pg-core';
import { userTypeEnum, coinTypeEnum } from './schema/enums';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: text('email').notNull(),
  type: text('type').notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  address: varchar('address', { length: 256 }).notNull(),
  city: varchar('city', { length: 256 }).notNull(),
  state: varchar('state', { length: 256 }).notNull(),
  country: varchar('country', { length: 256 }).notNull(),
  zip: varchar('zip', { length: 20 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const coins = pgTable('coins', {
  id: serial('id').primaryKey(),
  type: text('type').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  totalBalance: numeric('total_balance', { precision: 10, scale: 2 }).notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  transactionId: varchar('transaction_id', { length: 256 }).unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const coinrules = pgTable('coinrules', {
  id: serial('id').primaryKey(),
  numberOfCoins: integer('number_of_coins').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  description: varchar('description', { length: 512 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  razorpayOrderId: varchar('razorpay_order_id', { length: 256 }).notNull(),
  razorpayPaymentId: varchar('razorpay_payment_id', { length: 256 }),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  coins: integer('coins').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  status: varchar('status', { length: 50 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const rewardScheme = pgTable('reward_scheme', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  name: varchar('name', { length: 256 }).notNull(),
  category: varchar('category', { length: 256 }).notNull(),
  isActivated: boolean('is_activated').default(false).notNull(),
  description: varchar('description', { length: 512 }).notNull(),
  conditions: varchar('conditions', { length: 512 }).notNull(),
  coinReward: integer('coin_reward').notNull(),
  minimumPurchase: numeric('minimum_purchase', {
    precision: 10,
    scale: 2,
  }).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  maxRedemptions: integer('max_redemptions').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
