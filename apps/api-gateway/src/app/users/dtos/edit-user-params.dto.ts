import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class EditUserParamsDto {
  @ApiProperty({
    description: 'User id',
    example: '96c88771-b1b0-4454-94fd-93ddd1579c30',
  })
  @IsUUID(4)
  uuid: string;
}
