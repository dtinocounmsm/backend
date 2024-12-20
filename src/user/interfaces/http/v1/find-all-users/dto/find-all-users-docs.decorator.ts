import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindAllUsersResponseDto } from '@user/interfaces/http/v1/find-all-users/dto/find-all-users-response.dto';

export function FindAllUsersDocsDecorator(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Find all users',
    }),
    ApiResponse({
      status: 200,
      type: FindAllUsersResponseDto,
      description: 'List of all users',
    }),
  );
}
