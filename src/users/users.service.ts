import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { users } from '../db/schema';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { db } from '../db/connection';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class UsersService {
  async createUser(createUserDto: CreateUserDto) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Insert user into DB
    const [user] = await db
      .insert(users)
      .values({
        ...createUserDto,
        password: hashedPassword,
        createdAt: new Date(), // ✅ timestamp expects Date object
        updatedAt: new Date(), // ✅ timestamp expects Date object
      })
      .returning(); // ✅ returns array of inserted rows

    // Remove password before returning
    if (!user) throw new Error('User creation failed');

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, loginUserDto.email));

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.type },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' },
    );

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async logoutUser(userId: number) {}

  async getAllUsers() {
    const allUsers = await db.select().from(users);
    return allUsers.map(({ password, ...user }) => user);
  }
}
