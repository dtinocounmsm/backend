import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GenericResponseDto } from '@shared/infrastructure/dtos/generic-response.dto';

export function DeleteUserDocsDecorator(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete user',
    }),
    ApiResponse({
      status: 200,
      type: GenericResponseDto,
      description: 'Deleted user',
    }),
  );
}
