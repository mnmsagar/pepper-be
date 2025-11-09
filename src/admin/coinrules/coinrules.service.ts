import { Injectable } from '@nestjs/common';
import { CreateCoinRuleDto } from '../dto/coinrules.dto';
import { coinrules } from 'src/db/schema';
import { db } from 'src/db/connection';
import { sql } from 'drizzle-orm';

@Injectable()
export class CoinrulesService {
  async createCoinRule(createCoinRuleDto: CreateCoinRuleDto) {
    const [coinRule] = await db
      .insert(coinrules)
      .values({
        ...createCoinRuleDto,
        amount: String(createCoinRuleDto.amount),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    if (!coinRule) throw new Error('Coin rule creation failed');

    return coinRule;
  }

  // with pagination chaiye hai
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
