import { GenericResponseDto } from '@shared/infrastructure/dtos/generic-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from '@user/interfaces/http/v1/find-all-users/dto/find-all-users-response.dto';

export class FindUserByIdResponseDto extends GenericResponseDto {
  @ApiProperty({
    description: 'User',
    type: UserResponse,
  })
  data: UserResponse;
}
