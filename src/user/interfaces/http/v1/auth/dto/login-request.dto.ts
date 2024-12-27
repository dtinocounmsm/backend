import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    name: 'email',
    type: String,
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    type: String,
    description: 'User password',
    example: 'password123',
  })
  @IsString()
  password: string;
}
