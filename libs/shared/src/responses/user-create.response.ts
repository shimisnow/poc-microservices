import { ErrorsEnum } from '@shared/enums/errors.enum';

export class UserCreateResponse {
  performed: boolean;
  data?: {
    uuid: string;
  };
  error?: {
    code: ErrorsEnum;
    message?: string;
  };
}
