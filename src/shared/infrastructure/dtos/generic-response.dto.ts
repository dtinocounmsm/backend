import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GenericResponseDto {
  @ApiProperty({
    description: 'Trace ID',
    example: '64892698-6ba8-42f0-98cd-bcf97dd8f178',
    type: String,
  })
  @IsString()
  traceId: string;
}
