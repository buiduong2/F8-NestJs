import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export default class PasswordEncoder {
  saltRounds = 10;

  encode(str: string): Promise<string> {
    return bcrypt.hash(str, this.saltRounds);
  }

  matches(data: string | Buffer, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
