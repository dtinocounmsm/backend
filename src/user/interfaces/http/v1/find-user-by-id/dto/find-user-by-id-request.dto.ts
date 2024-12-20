import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindUserByIdRequestDto {
  @ApiProperty({
    description: 'id of the user',
    example: '123',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
