import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientKafkaMock } from './mocks/client-kafka.mock';
import { GetUserSerializer } from './serializers/get-user.serializer';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: 'USERS_SERVICE',
          useClass: ClientKafkaMock,
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('(users.controller) -> getUser()', () => {
    describe('Expect WITHOUT errors', () => {
      test('User exists (7537c8bd-c71c-4164-a7bb-8935769eef94)', async () => {
        const response = await controller.getUser({
          uuid: '7537c8bd-c71c-4164-a7bb-8935769eef94',
        });
        
        Object.getOwnPropertyNames(new GetUserSerializer()).forEach((property) => {
          expect(response).toHaveProperty(property);
        });
      });
    });

    describe('Expect WITH errors', () => {
      test('User does not exists (7537c8bd-c71c-4164-a7bb-8935769eef95)', async () => {
        try {
          await controller.getUser({
            uuid: '7537c8bd-c71c-4164-a7bb-8935769eef95',
          });
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });

  describe('(users.controller) -> createUser()', () => {
    describe('Expect WITHOUT errors', () => {
      test('Create user (unit-test-001@jest.com)', async () => {
        const response = await controller.createUser({
          name: 'Thomas A. Anderson',
          email: 'unit-test-001@jest.com',
          location: {
            latitude: '-23.433982',
            longitude: '-46.476069',
          }
        });
        
        expect(response).toHaveProperty('uuid');
        expect(response.uuid).toBe('93449ecf-415c-4d19-ba0d-b6fb24cdc2fe');
      });
    });

    describe('Expect WITH errors', () => {
      test('User does not exists (unit-test-002@jest.com)', async () => {
        try {
          await controller.createUser({
            name: 'Thomas A. Anderson',
            email: 'unit-test-002@jest.com',
            location: {
              latitude: '-23.433982',
              longitude: '-46.476069',
            }
          });
        } catch (error) {
          expect(error).toBeInstanceOf(ConflictException);
        }
      });
    });
  });

  describe('(users.controller) -> editUser()', () => {
    describe('Expect WITHOUT errors', () => {
      test('Edit user that exists (7537c8bd-c71c-4164-a7bb-8935769eef94)', async () => {
        const response = await controller.editUser({
          uuid: '7537c8bd-c71c-4164-a7bb-8935769eef94',
        }, {});
        
        expect(response).toHaveProperty('performed');
        expect(response.performed).toBeTruthy();
      });
    });

    describe('Expect WITH errors', () => {
      test('Edit user that does not exists (7537c8bd-c71c-4164-a7bb-8935769eef95)', async () => {
        try {
          await controller.editUser({
          uuid: '7537c8bd-c71c-4164-a7bb-8935769eef95',
        }, {});
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });

  describe('(users.controller) -> deleteUser()', () => {
    describe('Expect WITHOUT errors', () => {
      test('Delete user that exists (7537c8bd-c71c-4164-a7bb-8935769eef94)', async () => {
        const response = await controller.deleteUser({
          uuid: '7537c8bd-c71c-4164-a7bb-8935769eef94',
        });
        
        expect(response).toHaveProperty('performed');
        expect(response.performed).toBeTruthy();
      });
    });

    describe('Expect WITH errors', () => {
      test('Delete user that does not exists (7537c8bd-c71c-4164-a7bb-8935769eef95)', async () => {
        try {
          await controller.deleteUser({
          uuid: '7537c8bd-c71c-4164-a7bb-8935769eef95',
        });
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });
});
