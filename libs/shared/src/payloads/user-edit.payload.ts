import { UserEntity } from '../database/entities/user.entity';

export class UserEditPayload {
  uuid: string;
  entity: Partial<UserEntity>;
}
