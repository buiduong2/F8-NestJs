import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LogInDto {
  @IsEmail()
  @Length(3, 255)
  @IsString()
  @IsNotEmpty()
  email: string;

  @Length(6, 30)
  @IsString()
  @IsNotEmpty()
  password: string;
}
