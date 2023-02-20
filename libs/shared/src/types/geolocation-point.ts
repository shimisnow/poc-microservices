import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GeolocationPoint {
  @ApiProperty({
    description:
      'Geographic coordinate that specifies the north-south position of a point on the surface of the Earth',
    example: '-23.433981',
  })
  @IsNotEmpty()
  @IsNumberString()
  latitude: string;

  @ApiProperty({
    description:
      'Geographic coordinate that specifies the east-west position of a point on the surface of the Earth',
    example: '-46.476069',
  })
  @IsNotEmpty()
  @IsNumberString()
  longitude: string;
}
