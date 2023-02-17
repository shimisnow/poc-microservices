import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';
import { StreamingPlatform } from '@shared/streaming/config';
import { UserGetPayload } from '@shared/payloads/user-get.payload';
import { UserCreatePayload } from '@shared/payloads/user-create.payload';
import { UserEditPayload } from '@shared/payloads/user-edit.payload';
import { UserDeletePayload } from '@shared/payloads/user-delete.payload';
import { UserGetResponse } from '@shared/responses/user-get.response';
import { UserCreateResponse } from '@shared/responses/user-create.response';
import { UserEditResponse } from '@shared/responses/user-edit.response';
import { UserDeleteResponse } from '@shared/responses/user-delete.response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(StreamingPlatform.topics.USER.GET)
  async handleUserGet(@Payload() payload: UserGetPayload): Promise<UserGetResponse> {
    return await this.appService.getUser(payload.uuid);
  }

  @MessagePattern(StreamingPlatform.topics.USER.CREATE)
  async handleUserCreate(@Payload() payload: UserCreatePayload): Promise<UserCreateResponse> {
    return await this.appService.createUser(payload);
  }

  @MessagePattern(StreamingPlatform.topics.USER.EDIT)
  async handleUserEdit(@Payload() payload: UserEditPayload): Promise<UserEditResponse> {
    return await this.appService.editUser(payload);
  }

  @MessagePattern(StreamingPlatform.topics.USER.DELETE)
  async handleUserDelete(@Payload() payload: UserDeletePayload): Promise<UserDeleteResponse> {
    return await this.appService.deleteUser(payload.uuid);
  }
}
