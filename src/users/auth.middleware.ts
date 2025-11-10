import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // 1️⃣ Token read karo
    const authHeader = req.headers['authorization'] || req.cookies?.token;

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    // 2️⃣ Extract token (agar cookie ya bearer se aaya ho)
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;

    // 3️⃣ Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded; // ✅ attach user data to request
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
