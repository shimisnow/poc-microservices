import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GetUserParamsDto } from './dtos/get-user-params.dto';
import { CreateUserBodyDto } from './dtos/create-user-body.dto';
import { GetUserSerializer } from './serializers/get-user.serializer';
import { EditUserBodyDto } from './dtos/edit-user-body.dto';
import { EditUserParamsDto } from './dtos/edit-user-params.dto';
import { DeleteUserParamsDto } from './dtos/delete-user-params.dto';
import { CreateUserSerializer } from './serializers/create-user.serializer';
import { EditUserSerializer } from './serializers/edit-user.serializer';
import { DeleteUserSerializer } from './serializers/delete-user.serializer';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('users')
@Controller('users')
export class UsersController {

  @Get(':uuid')
  @ApiOperation({
    summary: 'Retrieves information about one user',
  })
  @ApiOkResponse({
    description: 'Information about the required user',
    type: GetUserSerializer,
  })
  getUser(@Param() params: GetUserParamsDto): GetUserSerializer {
    return;
  }

  @Post()
  @ApiOperation({
    summary: 'Creates an user',
  })
  @ApiCreatedResponse({
    description: 'UUID for the create user',
    type: CreateUserSerializer,
  })
  createUser(@Body() body: CreateUserBodyDto): CreateUserSerializer {
    return;
  }

  @Patch(':uuid')
  @ApiOperation({
    summary: 'Edits an user',
  })
  @ApiOkResponse({
    description: 'Information if the edit operation was performed',
    type: EditUserSerializer,
  })
  editUser(@Param() params: EditUserParamsDto, @Body() body: EditUserBodyDto): EditUserSerializer {
    return;
  }

  @Delete(':uuid')
  @ApiOperation({
    summary: 'Deletes an user',
  })
  @ApiOkResponse({
    description: 'Information if the delete operation was performed',
    type: DeleteUserSerializer,
  })
  delete(@Param() params: DeleteUserParamsDto): DeleteUserSerializer {
    return;
  }
}
