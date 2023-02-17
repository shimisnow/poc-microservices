import { ApiProperty } from "@nestjs/swagger";

export class DefaultError404Serializer {
  @ApiProperty({
    description: 'HTTP code',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    description: 'HTTP error message',
    example: 'Not Found',
  })
  message: string;
}
