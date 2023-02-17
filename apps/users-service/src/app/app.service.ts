import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UserCreatePayload } from '@shared/payloads/user-create.payload';
import { UserEditPayload } from '@shared/payloads/user-edit.payload';
import { UserGetResponse } from '@shared/responses/user-get.response';
import { UserCreateResponse } from '@shared/responses/user-create.response';
import { UserEditResponse } from '@shared/responses/user-edit.response';
import { UserDeleteResponse } from '@shared/responses/user-delete.response';
import { UserRepository } from './repositories/users/users.repository';


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
      response.performed = true;
      response.data = result;
    } catch (error) {
      response.error = error;
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
      console.log(error);
      response.error = error;
    }

    return response;
  }

  async editUser(data: UserEditPayload): Promise<UserEditResponse> {
    const response: UserEditResponse = {
      performed: false,
    }

    try {
      await this.userRepository.update(data.uuid, data.entity);
      response.performed = true;
    } catch (error) {
      response.error = error;
    }

    return response;
  }

  async deleteUser(uuid: string): Promise<UserDeleteResponse> {
    const response: UserDeleteResponse = {
      performed: false,
    }

    try {
      await this.userRepository.delete(uuid);
      response.performed = true;
    } catch (error) {
      response.error = error;
    }

    return response;
  }
}
