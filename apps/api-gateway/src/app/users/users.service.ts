import { Injectable } from '@nestjs/common';
import { CreateUserBodyDto } from './dtos/create-user-body.dto';
import { EditUserBodyDto } from './dtos/edit-user-body.dto';
import { CreateUserSerializer } from './serializers/create-user.serializer';
import { DeleteUserSerializer } from './serializers/delete-user.serializer';
import { EditUserSerializer } from './serializers/edit-user.serializer';
import { GetUserSerializer } from './serializers/get-user.serializer';

@Injectable()
export class UsersService {
  getUser(uuid: string): GetUserSerializer {
    return;
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
