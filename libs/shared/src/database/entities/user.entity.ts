import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { GeolocationPoint } from '../../types/geolocation-point';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryColumn({
    name: 'uuid',
    type: 'uuid',
    nullable: false,
  })
  uuid: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  email: string;

  @Index({ spatial: true })
  @Column({
    name: 'location',
    type: 'geography',
    spatialFeatureType: 'Point',
    nullable: false,
    transformer: {
      to: (value) => {
        if(value !== null) {
          return `(${value.latitute},${value.longitude})`;
        }
        return null;
      },
      from: (value) => {
        if(value !== null) {
          return {
            latitude: value.y,
            longitude: value.x,
          }
        }
        return null;
      }, 
    }
  })
  location: GeolocationPoint;
}
