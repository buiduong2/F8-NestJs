import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Unique } from '../../decorators/db-unique.decorator';

export class RegisterDto {
  @Length(6, 30)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @Length(3, 255)
  @IsString()
  @IsNotEmpty()
  @Unique('User', 'email')
  email: string;

  @Length(6, 30)
  @IsString()
  @IsNotEmpty()
  fullname: string;
}
