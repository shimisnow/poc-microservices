import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetUserParamsDto } from './dtos/get-user-params.dto';
import { CreateUserBodyDto } from './dtos/create-user-body.dto';
import { GetUserSerializer } from './serializers/get-user.serializer';
import { EditUserBodyDto } from './dtos/edit-user-body.dto';
import { EditUserParamsDto } from './dtos/edit-user-params.dto';
import { DeleteUserParamsDto } from './dtos/delete-user-params.dto';
import { CreateUserSerializer } from './serializers/create-user.serializer';
import { EditUserSerializer } from './serializers/edit-user.serializer';
import { DeleteUserSerializer } from './serializers/delete-user.serializer';
import { UsersService } from './users.service';
import { DefaultError404Serializer } from './documentation/default-error-404.serializer';
import { DefaultError500Serializer } from './documentation/default-error-500.serializer';
import { DefaultError502Serializer } from './documentation/default-error-502.serializer';
import { DefaultError400Serializer } from './documentation/default-error-400.serializer';
import { CreateUserError409Serializer } from './documentation/create-user-error-409.serializer';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':uuid')
  @ApiOperation({
    summary: 'Retrieves information about one user',
  })
  @ApiOkResponse({
    description: 'Information about the required user',
    type: GetUserSerializer,
  })
  @ApiBadRequestResponse({
    description: 'Error validating request input data',
    type: DefaultError400Serializer,
  })
  @ApiNotFoundResponse({
    description: 'The requested user does not exists',
    type: DefaultError404Serializer,
  })
  @ApiInternalServerErrorResponse({
    description:
      'The server has encountered a situation it does not know how to handle. See server logs for details',
    type: DefaultError500Serializer,
  })
  @ApiBadGatewayResponse({
    description: 'Errors with database operations',
    type: DefaultError502Serializer,
  })
  async getUser(@Param() params: GetUserParamsDto): Promise<GetUserSerializer> {
    return await this.usersService.getUser(params.uuid);
  }

  @Post()
  @ApiOperation({
    summary: 'Creates an user',
  })
  @ApiCreatedResponse({
    description: 'Information about the created user',
    type: CreateUserSerializer,
  })
  @ApiBadRequestResponse({
    description: 'Error validating request input data',
    type: DefaultError400Serializer,
  })
  @ApiConflictResponse({
    description: 'Some unique information for the user is already registered',
    type: CreateUserError409Serializer,
  })
  @ApiInternalServerErrorResponse({
    description:
      'The server has encountered a situation it does not know how to handle. See server logs for details',
    type: DefaultError500Serializer,
  })
  @ApiBadGatewayResponse({
    description: 'Errors with database operations',
    type: DefaultError502Serializer,
  })
  async createUser(
    @Body() body: CreateUserBodyDto
  ): Promise<CreateUserSerializer> {
    return await this.usersService.createUser(body);
  }

  @Patch(':uuid')
  @ApiOperation({
    summary: 'Edits an user',
  })
  @ApiOkResponse({
    description: 'Information if the edit operation was performed',
    type: EditUserSerializer,
  })
  @ApiBadRequestResponse({
    description: 'Error validating request input data',
    type: DefaultError400Serializer,
  })
  @ApiNotFoundResponse({
    description: 'The requested user does not exists',
    type: DefaultError404Serializer,
  })
  @ApiInternalServerErrorResponse({
    description:
      'The server has encountered a situation it does not know how to handle. See server logs for details',
    type: DefaultError500Serializer,
  })
  @ApiBadGatewayResponse({
    description: 'Errors with database operations',
    type: DefaultError502Serializer,
  })
  async editUser(
    @Param() params: EditUserParamsDto,
    @Body() body: EditUserBodyDto
  ): Promise<EditUserSerializer> {
    return await this.usersService.editUser(params.uuid, body);
  }

  @Delete(':uuid')
  @ApiOperation({
    summary: 'Deletes an user',
  })
  @ApiOkResponse({
    description: 'Information if the delete operation was performed',
    type: DeleteUserSerializer,
  })
  @ApiBadRequestResponse({
    description: 'Error validating request input data',
    type: DefaultError400Serializer,
  })
  @ApiNotFoundResponse({
    description: 'The requested user does not exists',
    type: DefaultError404Serializer,
  })
  @ApiInternalServerErrorResponse({
    description:
      'The server has encountered a situation it does not know how to handle. See server logs for details',
    type: DefaultError500Serializer,
  })
  @ApiBadGatewayResponse({
    description: 'Errors with database operations',
    type: DefaultError502Serializer,
  })
  async deleteUser(
    @Param() params: DeleteUserParamsDto
  ): Promise<DeleteUserSerializer> {
    return await this.usersService.deleteUser(params.uuid);
  }
}
