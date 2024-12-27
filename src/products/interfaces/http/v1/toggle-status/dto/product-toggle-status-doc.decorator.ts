import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GenericResponseDto } from '@shared/infrastructure/dtos/generic-response.dto';

export function ProductToggleStatusDoc(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Product Toggle Status',
    }),
    ApiResponse({
      status: 201,
      type: GenericResponseDto,
      description: 'The product status has been successfully toggled.',
    }),
  );
}
