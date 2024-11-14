import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import PasswordEncoder from 'src/utils/password-encoder';
import { PrismaService } from 'src/utils/db';
import { BlackListTokenStore } from 'src/utils/black-list-token-store';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    PasswordEncoder,
    PrismaService,
    BlackListTokenStore,
  ],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10m' },
    }),
  ],
})
export class AuthModule {}
