import { ErrorsEnum } from '@shared/enums/errors.enum';

export class UserDeleteResponse {
  performed: boolean;
  error?: {
    code: ErrorsEnum;
    message?: string;
  };
}
