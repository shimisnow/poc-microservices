import { EntityNotFoundError, QueryFailedError } from 'typeorm';

import { ErrorsEnum } from '../../enums/errors.enum';
import { ErrorResponse } from '../../responses/error.response';

export class DatabaseErrorManager {
  public static errorToResponse(error: Error): ErrorResponse {
    const response: ErrorResponse = {
      code: ErrorsEnum.INTERNAL_SERVER_ERROR,
    };

    switch (error.constructor) {
      case QueryFailedError:
        if (error.message.startsWith('duplicate key')) {
          response.code = ErrorsEnum.CONFLICT;
        } else {
          response.code = ErrorsEnum.BAD_GATEWAY;
          response.message = error.message;
        }
        break;
      case EntityNotFoundError:
        response.code = ErrorsEnum.NOT_FOUND;
        break;
      default:
        response.message = error.message;
    }

    return response;
  }
}
