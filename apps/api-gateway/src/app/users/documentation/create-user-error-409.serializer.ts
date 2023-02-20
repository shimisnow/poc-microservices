import { ApiProperty } from '@nestjs/swagger';

export class CreateUserError409Serializer {
  @ApiProperty({
    description: 'HTTP code',
    example: 409,
  })
  statusCode: number;

  @ApiProperty({
    description: 'HTTP error message',
    example: 'Conflict',
  })
  message: string;
}
