import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ProductToggleStatusRequestDto {
  @ApiProperty({
    description: "The product's status",
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  status: boolean;
}
