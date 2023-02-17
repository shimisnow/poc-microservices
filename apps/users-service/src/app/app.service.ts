import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { DatabaseErrorManager } from '@shared/utils/database-error/database-error-manager';
import { UserCreatePayload } from '@shared/payloads/user-create.payload';
import { UserEditPayload } from '@shared/payloads/user-edit.payload';
import { UserGetResponse } from '@shared/responses/user-get.response';
import { UserCreateResponse } from '@shared/responses/user-create.response';
import { UserEditResponse } from '@shared/responses/user-edit.response';
import { UserDeleteResponse } from '@shared/responses/user-delete.response';
import { UserRepository } from './repositories/users/users.repository';
import { ErrorsEnum } from '@shared/enums/errors.enum';


@Injectable()
export class AppService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async getUser(uuid: string): Promise<UserGetResponse> {
    const response: UserGetResponse = {
      performed: false,
    }

    try {
      const result = await this.userRepository.findByUUID(uuid);

      if(result) {
        response.performed = true;
        response.data = result;
      } else {
        response.error.code = ErrorsEnum.NOT_FOUND;
      }
    } catch (error) {
      response.error = DatabaseErrorManager.errorToResponse(error);
    }

    return response;
  }

  async createUser(data: UserCreatePayload): Promise<UserCreateResponse> {
    const response: UserCreateResponse = {
      performed: false,
    }

    try {
      const uuid = uuidv4();

      await this.userRepository.insert({
        uuid,
        ...data.entity,
      })

      response.performed = true;
      response.data = {
        uuid,
      }
    } catch (error) {
      response.error = DatabaseErrorManager.errorToResponse(error);
    }

    return response;
  }

  async editUser(data: UserEditPayload): Promise<UserEditResponse> {
    const response: UserEditResponse = {
      performed: false,
    }

    try {
      const result: boolean = await this.userRepository.update(data.uuid, data.entity);

      if(result) {
        response.performed = true;
      } else {
        response.error = {
          code: ErrorsEnum.NOT_FOUND,
        }
      }
    } catch (error) {
      response.error = DatabaseErrorManager.errorToResponse(error);
    }

    return response;
  }

  async deleteUser(uuid: string): Promise<UserDeleteResponse> {
    const response: UserDeleteResponse = {
      performed: false,
    }

    try {
      const result: boolean = await this.userRepository.delete(uuid);
      
      if(result) {
        response.performed = true;
      } else {
        response.error = {
          code: ErrorsEnum.NOT_FOUND,
        }
      }
    } catch (error) {
      response.error = DatabaseErrorManager.errorToResponse(error);
    }

    return response;
  }
}
