import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GenericResponseDto } from '@shared/infrastructure/dtos/generic-response.dto';

export function CreateUserDoc(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Create New User',
    }),
    ApiResponse({
      status: 201,
      type: GenericResponseDto,
      description: 'The user has been successfully created.',
    }),
  );
}