import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import PasswordEncoder from 'src/utils/password-encoder';
import { TokenDto } from './dto/auth-res.dto';
import { BlackListTokenStore } from 'src/utils/black-list-token-store';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private passwordEncoder: PasswordEncoder,
    private blackTokenStore: BlackListTokenStore,
  ) {}

  async login(email: string, password: string): Promise<TokenDto> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      if (this.passwordEncoder.matches(password, user.password)) {
        return {
          access_token: await this.generateToken(user),
        };
      }
    }

    throw new UnauthorizedException('Tài khoản hoặc mật khẩu không chính xác');
  }

  async register(signUpDto: any): Promise<TokenDto> {
    signUpDto.password = await this.passwordEncoder.encode(signUpDto.password);
    const user = await this.userService.create(signUpDto);
    return {
      access_token: await this.generateToken(user),
    };
  }

  async logout(token: string) {
    const result = this.jwtService.decode(token, { json: true });
    this.blackTokenStore.add({ exp: result.exp, token });
  }

  async getProfile(email: string) {
    return this.userService.findProfileByEmail(email);
  }

  private generateToken(user: User): Promise<string> {
    return this.jwtService.signAsync({ sub: user.id, email: user.email });
  }
}
