import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsDateString,
  IsBoolean,
  IsNumber,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    description: "The user's first name",
    example: 'Juan',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "The user's first surname",
    example: 'Perez',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  firstSurname: string;

  @ApiProperty({
    description: "The user's second surname",
    example: 'Vargas',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  secondSurname: string;

  @ApiProperty({
    description: "The user's email address",
    example: 'vargas@yopmail.com',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "The user's password",
    example: '123456',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: "The user's address",
    example: 'Avenue Arequipa 123',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: "The country code for the user's phone number",
    example: '+51',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @ApiProperty({
    description: "The user's phone number",
    example: '123456789',
    type: String,
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: "The user's birthdate",
    example: '1990-01-01',
    type: String,
  })
  @IsDateString()
  @IsNotEmpty()
  birthdate: string;

  @ApiProperty({
    description: "The user's gender",
    example: 'M',
    enum: ['M', 'F'],
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  gender: 'M' | 'F';

  @ApiProperty({
    description: 'The profile ID associated with the user',
    example: 1,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  profileId: number;

  @ApiProperty({
    description: "Whether the user's account is active or not",
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  active: boolean;
}
