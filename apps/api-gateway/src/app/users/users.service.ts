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

  createUser(user: CreateUserBodyDto): CreateUserSerializer {
    return;
  }

  editUser(uuid: string, body: EditUserBodyDto): EditUserSerializer {
    return;
  }

  deleteUser(uuid: string): DeleteUserSerializer {
    return;
  }
}
