import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GenericResponseDto } from '@shared/infrastructure/dtos/generic-response.dto';

export function DeleteProductDocsDecorator(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete product',
    }),
    ApiResponse({
      status: 200,
      type: GenericResponseDto,
      description: 'Deleted product',
    }),
  );
}
