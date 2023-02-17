import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { StreamingPlatform } from '@shared/streaming/config';
import { firstValueFrom } from 'rxjs';
import { CreateUserBodyDto } from './dtos/create-user-body.dto';
import { EditUserBodyDto } from './dtos/edit-user-body.dto';
import { CreateUserSerializer } from './serializers/create-user.serializer';
import { DeleteUserSerializer } from './serializers/delete-user.serializer';
import { EditUserSerializer } from './serializers/edit-user.serializer';
import { GetUserSerializer } from './serializers/get-user.serializer';
import { UserGetPayload } from '@shared/payloads/user-get.payload';
import { UserGetResponse } from '@shared/responses/user-get.response';
import { UserCreatePayload } from '@shared/payloads/user-create.payload';
import { UserCreateResponse } from '@shared/responses/user-create.response';
import { UserEditPayload } from '@shared/payloads/user-edit.payload';
import { UserEditResponse } from '@shared/responses/user-edit.response';
import { UserDeletePayload } from '@shared/payloads/user-delete.payload';
import { UserDeleteResponse } from '@shared/responses/user-delete.response';

@Injectable()
export class UsersService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}

  async onModuleInit() {
    Object.values(StreamingPlatform.topics.USER)
      .forEach((topic) => {
        this.userClient.subscribeToResponseOf(topic);
      });
    await this.userClient.connect();
  }

  async onModuleDestroy() {
    await this.userClient.close();
  }

  async getUser(uuid: string): Promise<GetUserSerializer> {
    const payload: UserGetPayload = {
      uuid,
    };

    const response: UserGetResponse = await firstValueFrom(
      this.userClient.send(
        StreamingPlatform.topics.USER.GET,
        JSON.stringify(payload),
      ),
    );

    if(response.performed) {
      return response.data as GetUserSerializer;
    } else {
      console.log(response);
      return null;
    }
  }

  async createUser(user: CreateUserBodyDto): Promise<CreateUserSerializer> {
    const payload: UserCreatePayload = {
      entity: user,
    }

    const response: UserCreateResponse = await firstValueFrom(
      this.userClient.send(
        StreamingPlatform.topics.USER.CREATE,
        JSON.stringify(payload),
      )
    );

    if(response.performed) {
      return response.data as CreateUserSerializer;
    } else {
      console.log(response);
      return null;
    }
  }

  async editUser(uuid: string, body: EditUserBodyDto): Promise<EditUserSerializer> {
    const payload: UserEditPayload = {
      uuid,
      entity: body,
    };

    const response: UserEditResponse = await firstValueFrom(
      this.userClient.send(
        StreamingPlatform.topics.USER.EDIT,
        JSON.stringify(payload),
      ),
    );

    if(response.performed) {
      return response as EditUserSerializer;
    } else {
      console.log(response);
      return null;
    }
  }

  async deleteUser(uuid: string): Promise<DeleteUserSerializer> {
    const payload: UserDeletePayload = {
      uuid,
    };

    const response: UserDeleteResponse = await firstValueFrom(
      this.userClient.send(
        StreamingPlatform.topics.USER.DELETE,
        JSON.stringify(payload),
      ),
    );

    if(response.performed) {
      return response as DeleteUserSerializer;
    } else {
      console.log(response);
      return null;
    }
  }
}
