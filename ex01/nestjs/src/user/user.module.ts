import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/utils/db';

@Module({
  providers: [UserService, PrismaService],
})
export class UserModule {}
