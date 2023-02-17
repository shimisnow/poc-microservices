import { ErrorsEnum } from '@shared/enums/errors.enum';

export class UserEditResponse {
  performed: boolean;
  error?: {
    code: ErrorsEnum;
    message?: string;
  };
}
