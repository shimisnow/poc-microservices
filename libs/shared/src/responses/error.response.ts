import { ErrorsEnum } from '../enums/errors.enum';

export class ErrorResponse {
  code: ErrorsEnum;
  message?: string;
}
