import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindUserByIdRequestDto {
  @ApiProperty({
    description: 'id of the user',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => Number(value))
  readonly id: number;
}
