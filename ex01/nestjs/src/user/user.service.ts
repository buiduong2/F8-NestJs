import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/utils/db';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(user: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: user,
    });
  }

  findProfileByEmail(email: string) {
    email = email || '';
    return this.prisma.user.findFirst({
      select: {
        email: true,
        fullname: true,
        id: true,
      },
      where: { email },
    });
  }

  findByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({ where: { email } });
  }
}
