import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator/types/decorator/decorators';

export class CreateUserBodyDto {
  @ApiProperty({
    description: 'User name',
    example: 'Thomas A. Anderson',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
