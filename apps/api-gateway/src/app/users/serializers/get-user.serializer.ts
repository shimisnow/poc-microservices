import { ApiProperty } from '@nestjs/swagger';
import { GeolocationPoint } from '@shared/types/geolocation-point';

export class GetUserSerializer {
  @ApiProperty({
    description: 'User name',
    example: 'Thomas A. Anderson',
  })
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'thomas.anderson@matrix.ai',
  })
  email: string;

  @ApiProperty({
    description: 'User geographic location',
    type: GeolocationPoint,
  })
  location: GeolocationPoint;
}
