import { Injectable } from '@nestjs/common';
import { coinrules } from 'src/db/schema';
import { db } from 'src/db/connection';
import { sql } from 'drizzle-orm';

@Injectable()
export class CoinrulesService {
  async getAllCoinRules(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    // 1️⃣ Fetch paginated data
    const coinRules = await db
      .select()
      .from(coinrules)
      .limit(limit)
      .offset(offset);

    // 2️⃣ Fetch total count (for frontend pagination)
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(coinrules);

    // 3️⃣ Prepare metadata
    const total = Number(count);
    const totalPages = Math.ceil(total / limit);

    return {
      data: coinRules,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }
}
