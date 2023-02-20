import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRepository } from './repositories/users/users.repository';
import { UserRepositoryMock } from './mocks/user-repository.mock';
import { UserEntity } from '@shared/database/entities/user.entity';
import { UserGetResponse } from '@shared/responses/user-get.response';
import { ErrorsEnum } from '@shared/enums/errors.enum';
import { UserCreateResponse } from '@shared/responses/user-create.response';
import { UserEditResponse } from '@shared/responses/user-edit.response';
import { UserDeleteResponse } from '@shared/responses/user-delete.response';

describe('AppController', () => {
  let app: TestingModule;
  let controller: AppController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: UserRepository,
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    controller = app.get<AppController>(AppController);
  });

  describe('(app.controller) -> handleUserGet()', () => {
    describe('Expect WITHOUT errors', () => {
      test('User exists (7b093ca2-dfe7-4f8e-8f90-76174a722bfd)', async () => {
        const response: UserGetResponse = await controller.handleUserGet({
          uuid: '7b093ca2-dfe7-4f8e-8f90-76174a722bfd',
        });

        expect(response).toHaveProperty('performed');
        expect(response.performed).toBeTruthy();
        Object.getOwnPropertyNames(new UserEntity()).forEach((property) => {
          expect(response.data).toHaveProperty(property);
        });
      });
    });

    describe('Expect WITH errors', () => {
      test('User does not exists (7b093ca2-dfe7-4f8e-8f90-76174a722bf5)', async () => {
        const response: UserGetResponse = await controller.handleUserGet({
          uuid: '7b093ca2-dfe7-4f8e-8f90-76174a722bf5',
        });

        expect(response).toHaveProperty('performed');
        expect(response.performed).toBeFalsy();
        expect(response.error.code).toBe(ErrorsEnum.NOT_FOUND);
      });
    });
  });

  describe('(app.controller) -> handleUserCreate()', () => {
    describe('Expect WITHOUT errors', () => {
      test('User does not exists (test-jest-001@jest.com)', async () => {
        const response: UserCreateResponse = await controller.handleUserCreate({
          entity: {
            name: 'Thomas A. Anderson',
            email: 'test-jest-001@jest.com',
            location: {
              latitude: '-23.433982',
              longitude: '-46.476069',
            },
          },
        });

        expect(response).toHaveProperty('performed');
        expect(response.performed).toBeTruthy();
        expect(response).toHaveProperty('data.uuid');
      });
    });

    describe('Expect WITH errors', () => {
      test('User already exists (test-jest-002@jest.com)', async () => {
        const response: UserCreateResponse = await controller.handleUserCreate({
          entity: {
            name: 'Thomas A. Anderson',
            email: 'test-jest-002@jest.com',
            location: {
              latitude: '-23.433982',
              longitude: '-46.476069',
            },
          },
        });

        expect(response).toHaveProperty('performed');
        expect(response.performed).toBeFalsy();
        expect(response.error.code).toBe(ErrorsEnum.CONFLICT);
      });
    });
  });

  describe('(app.controller) -> handleUserEdit()', () => {
    describe('Expect WITHOUT errors', () => {
      test('User exists (7b093ca2-dfe7-4f8e-8f90-76174a722bfd)', async () => {
        const response: UserEditResponse = await controller.handleUserEdit({
          uuid: '7b093ca2-dfe7-4f8e-8f90-76174a722bfd',
          entity: {
            name: 'Thomas A. Anderson',
            email: 'test-jest-001@jest.com',
          },
        });

        expect(response).toHaveProperty('performed');
        expect(response.performed).toBeTruthy();
      });
    });

    describe('Expect WITH errors', () => {
      test('User does not exists (7b093ca2-dfe7-4f8e-8f90-76174a722bf5)', async () => {
        const response: UserEditResponse = await controller.handleUserEdit({
          uuid: '7b093ca2-dfe7-4f8e-8f90-76174a722bf5',
          entity: {
            name: 'Thomas A. Anderson',
            email: 'test-jest-001@jest.com',
          },
        });

        expect(response).toHaveProperty('performed');
        expect(response.performed).toBeFalsy();
      });
    });
  });

  describe('(app.controller) -> handleUserDelete()', () => {
    describe('Expect WITHOUT errors', () => {
      test('User exists (7b093ca2-dfe7-4f8e-8f90-76174a722bfd)', async () => {
        const response: UserDeleteResponse = await controller.handleUserDelete({
          uuid: '7b093ca2-dfe7-4f8e-8f90-76174a722bfd',
        });

        expect(response).toHaveProperty('performed');
        expect(response.performed).toBeTruthy();
      });
    });

    describe('Expect WITH errors', () => {
      test('User does not exists (7b093ca2-dfe7-4f8e-8f90-76174a722bf5)', async () => {
        const response: UserDeleteResponse = await controller.handleUserDelete({
          uuid: '7b093ca2-dfe7-4f8e-8f90-76174a722bf5',
        });

        expect(response).toHaveProperty('performed');
        expect(response.performed).toBeFalsy();
      });
    });
  });
});
