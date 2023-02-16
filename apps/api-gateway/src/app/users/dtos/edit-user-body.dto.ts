import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditUserBodyDto {
  @ApiProperty({
    description: 'User name',
    example: 'Thomas A. Anderson',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
