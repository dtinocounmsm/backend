import { GenericResponseDto } from '@shared/infrastructure/dtos/generic-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    example: 1,
    type: 'number',
    description: 'The user id of the user list',
  })
  id: number;

  @ApiProperty({
    example: 'Jhonatan',
    type: 'string',
    description: 'The name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'Rivera',
    type: 'string',
    description: 'The first surname of the user',
  })
  firstSurname: string;

  @ApiProperty({
    example: 'Carbajal',
    type: 'string',
    description: 'The second surname of the user',
  })
  secondSurname: string;

  @ApiProperty({
    example: 'carbajal@gmail.com',
    type: 'string',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'Avenida Arequipa 123',
    type: 'string',
    description: 'The address of the user',
  })
  address: string;

  @ApiProperty({
    example: '+51',
    type: 'string',
    description: 'The country code of the user',
  })
  countryCode: string;

  @ApiProperty({
    example: '123456789',
    type: 'string',
    description: 'The phone number of the user',
  })
  phone: string;

  @ApiProperty({
    example: '1990-01-01',
    type: 'string',
    description: 'The birthdate of the user',
  })
  birthdate: string;

  @ApiProperty({
    example: 'M',
    type: 'string',
    description: 'The gender of the user',
  })
  gender: string;

  @ApiProperty({
    example: 1,
    type: 'number',
    description: 'The profile id of the user',
  })
  profileId: number;

  @ApiProperty({
    example: true,
    type: 'boolean',
    description: 'The active status of the user',
  })
  active: boolean;
}

export class FindAllUsersResponseDto extends GenericResponseDto {
  @ApiProperty({
    description: 'List of all users',
    type: UserResponse,
    isArray: true,
  })
  data: Array<UserResponse>;
}
