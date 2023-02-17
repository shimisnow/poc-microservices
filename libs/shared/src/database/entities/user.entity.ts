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
          return {
            type: 'Point',
            coordinates: [
              value.longitude,
              value.latitude,
            ]
          };
        }
        return null;
      },
      from: (value) => {
        if(value !== null) {
          if(Array.isArray(value.coordinates)) {
            return {
              latitude: value.coordinates[1],
              longitude: value.coordinates[0],
            }
          }
        }
        return null;
      }, 
    }
  })
  location: GeolocationPoint;
}
