import { UserEntity } from '@shared/database/entities/user.entity';

export class UserCreatePayload {
  entity: Omit<UserEntity, 'uuid'>;
}
