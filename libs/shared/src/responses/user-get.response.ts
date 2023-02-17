import { UserEntity } from '../database/entities/user.entity';

export class UserGetResponse {
  performed: boolean;
  data?: UserEntity;
  error?: any;
}
