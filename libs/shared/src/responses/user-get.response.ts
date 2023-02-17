import { ErrorsEnum } from '@shared/enums/errors.enum';
import { UserEntity } from '../database/entities/user.entity';

export class UserGetResponse {
  performed: boolean;
  data?: UserEntity;
  error?: {
    code: ErrorsEnum;
    message?: string;
  };
}
