import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindUserByIdResponseDto } from '@user/interfaces/http/v1/find-user-by-id/dto/find-user-by-id-response.dto';

export function FindUserByIdDocsDecorator(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Find user by id',
    }),
    ApiResponse({
      status: 200,
      type: FindUserByIdResponseDto,
      description: 'Founded user',
    }),
  );
}
