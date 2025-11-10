import { Injectable } from '@nestjs/common';
import { desc, eq, sql } from 'drizzle-orm';
import { db } from 'src/db/connection';
import { coins } from 'src/db/schema';

@Injectable()
export class DashboardService {
  async getDashboard(userId: number): Promise<any> {
    // 1️⃣ Total coins distributed (sum of CREDIT)
    const [creditSum] = await db
      .select({
        total: sql<number>`SUM(${coins.amount})`,
      })
      .from(coins)
      .where(eq(coins.userId, userId));

    const totalCoinsDistributed = creditSum?.total || 0;

    // 2️⃣ Latest wallet balance
    const [latest] = await db
      .select({
        totalBalance: coins.totalBalance,
      })
      .from(coins)
      .where(eq(coins.userId, userId))
      .orderBy(desc(coins.createdAt))
      .limit(1);

    const walletBalance = latest?.totalBalance || 0;

    // 3️⃣ Total transactions
    const [count] = await db
      .select({ total: sql<number>`COUNT(*)` })
      .from(coins)
      .where(eq(coins.userId, userId));

    const totalTransactions = count.total || 0;

    // 4️⃣ Recent transactions (latest 5)
    const recentTransactions = await db
      .select({
        id: coins.id,
        amount: coins.amount,
        date: coins.createdAt,
        type: coins.type,
        availableBalance: coins.totalBalance,
      })
      .from(coins)
      .where(eq(coins.userId, userId))
      .orderBy(desc(coins.createdAt))
      .limit(5);

    // 5️⃣ Top performing schemes (dummy for now, replace when scheme table ready)
    const topPerformingSchemes = [
      {
        name: 'Scheme A',
        coinsDistributed: 3000,
        numberOfUsers: 150,
      },
      {
        name: 'Scheme B',
        coinsDistributed: 2500,
        numberOfUsers: 120,
      },
    ];

    // 6️⃣ Return formatted data
    return {
      data: {
        totalCoinsDistributed: Number(totalCoinsDistributed),
        walletBalance: Number(walletBalance),
        activeSchemes: 12, // dummy, replace later
        totalTransactions,
        recentTransactions: recentTransactions.map((t) => ({
          ...t,
          amount: Number(t.amount),
          availableBalance: Number(t.availableBalance),
          date: t.date.toISOString().split('T')[0], // format date
        })),
        topPerformingSchemes,
      },
    };
  }
}
