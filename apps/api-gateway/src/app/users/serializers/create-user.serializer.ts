import { ApiProperty } from '@nestjs/swagger';

export class CreateUserSerializer {
  @ApiProperty({
    description: 'User id',
    example: '96c88771-b1b0-4454-94fd-93ddd1579c30',
  })
  uuid: string;
}
