import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { GeolocationPoint } from '@shared/types/geolocation-point';

export class CreateUserBodyDto {
  @ApiProperty({
    description: 'User name',
    example: 'Thomas A. Anderson',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'thomas.anderson@matrix.ai',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User geographic location',
    type: GeolocationPoint,
  })
  @IsNotEmpty()
  @ValidateNested()
  location: GeolocationPoint;
}
