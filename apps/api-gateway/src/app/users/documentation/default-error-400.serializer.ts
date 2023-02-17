import { ApiProperty } from "@nestjs/swagger";

export class DefaultError400Serializer {
  @ApiProperty({
    description: 'HTTP code',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Validation error messages',
    example: [
      'uuid must be a UUID',
    ],
  })
  message: Array<string>

  @ApiProperty({
    description: 'HTTP error message',
    example: 'Bad Request',
  })
  error: string;
}
