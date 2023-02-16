import { ApiPropertyOptional } from '@nestjs/swagger';
import { GeolocationPoint } from '@shared/types/geolocation-point';
import { IsEmail, IsString, ValidateNested } from 'class-validator';

export class EditUserBodyDto {
  @ApiPropertyOptional({
    description: 'User name',
    example: 'Thomas A. Anderson',
  })
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'User email',
    example: 'thomas.anderson@matrix.ai',
  })
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'User geographic location',
    type: GeolocationPoint,
  })
  @ValidateNested()
  location?: GeolocationPoint;
}
