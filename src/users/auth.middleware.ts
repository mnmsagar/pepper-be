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
    // 🧩 Step 1: Read from header or cookie
    const authHeader = req.headers['authorization'];
    const cookieToken = req.cookies?.token;

    console.log('Auth Header:', req);
    console.log('Cookie Token:', cookieToken);

    // 🧠 Step 2: Pick token from either source
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : cookieToken;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    // 🔐 Step 3: Verify JWT
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded; // attach decoded user to request
      next();
    } catch (error: any) {
      console.error('JWT verification error:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
