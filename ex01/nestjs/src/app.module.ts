import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UniqueConstraint } from './decorators/db-unique.decorator';
import { PrismaService } from './utils/db';
import PasswordEncoder from './utils/password-encoder';
import { BlackListTokenStore } from './utils/black-list-token-store';

@Module({
  imports: [UserModule, AuthModule],
  providers: [
    UniqueConstraint,
    PrismaService,
    PasswordEncoder,
    BlackListTokenStore,
  ],
})
export class AppModule {}
