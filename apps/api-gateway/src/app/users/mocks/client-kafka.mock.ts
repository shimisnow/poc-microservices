import { Observable, of } from 'rxjs';
import { ErrorsEnum } from '@shared/enums/errors.enum';
import { UserCreatePayload } from '@shared/payloads/user-create.payload';
import { UserDeletePayload } from '@shared/payloads/user-delete.payload';
import { UserEditPayload } from '@shared/payloads/user-edit.payload';
import { UserGetPayload } from '@shared/payloads/user-get.payload';
import { UserCreateResponse } from '@shared/responses/user-create.response';
import { UserDeleteResponse } from '@shared/responses/user-delete.response';
import { UserEditResponse } from '@shared/responses/user-edit.response';
import { UserGetResponse } from '@shared/responses/user-get.response';
import { StreamingPlatform } from '@shared/streaming/config';

export class ClientKafkaMock {
  /**
   * Call a specific function to deal with each Kafka topic. See the private functions for details.
   *
   * @param topic Topics for the USER domain.
   * @param payload Input to test.
   * @returns Observable with the expected response for the topic.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send(topic: string, payload: string): Observable<any> {
    switch (topic) {
      case StreamingPlatform.topics.USER.GET:
        return of(this.sendTopicUserGet(JSON.parse(payload)));
      case StreamingPlatform.topics.USER.CREATE:
        return of(this.sendTopicUserCreate(JSON.parse(payload)));
      case StreamingPlatform.topics.USER.EDIT:
        return of(this.sendTopicUserEdit(JSON.parse(payload)));
      case StreamingPlatform.topics.USER.DELETE:
        return of(this.sendTopicUserDelete(JSON.parse(payload)));
    }
  }

  /**
   * Returns a user when uuid is '7537c8bd-c71c-4164-a7bb-8935769eef94', otherwise will return a not found error code.
   *
   * @param payload Input to test.
   * @returns Mocked value.
   */
  private sendTopicUserGet(payload: UserGetPayload): UserGetResponse {
    switch (payload.uuid) {
      case '7537c8bd-c71c-4164-a7bb-8935769eef94':
        return {
          performed: true,
          data: {
            name: 'Thomas A. Anderson',
            email: 'thomas.anderson@matrix.ai',
            location: {
              latitude: '-23.433982',
              longitude: '-46.476069',
            },
          },
        } as UserGetResponse;
      default:
        return {
          performed: false,
          error: {
            code: ErrorsEnum.NOT_FOUND,
          },
        } as UserGetResponse;
    }
  }

  /**
   * Creates the user when email is 'unit-test-001@jest.com', otherwise will return a 'conflict error' simulating duplicated entity.
   * @param payload
   * @returns
   */
  private sendTopicUserCreate(payload: UserCreatePayload): UserCreateResponse {
    switch (payload.entity.email) {
      case 'unit-test-001@jest.com':
        return {
          performed: true,
          data: {
            uuid: '93449ecf-415c-4d19-ba0d-b6fb24cdc2fe',
          },
        } as UserCreateResponse;
      default:
        return {
          performed: false,
          error: {
            code: ErrorsEnum.CONFLICT,
          },
        } as UserCreateResponse;
    }
  }

  /**
   * Performs the action when uuid is '7537c8bd-c71c-4164-a7bb-8935769eef94', otherwise will return a not found error code.
   *
   * @param payload Input to test.
   * @returns Mocked value.
   */
  private sendTopicUserEdit(payload: UserEditPayload): UserEditResponse {
    switch (payload.uuid) {
      case '7537c8bd-c71c-4164-a7bb-8935769eef94':
        return {
          performed: true,
        } as UserEditResponse;
      default:
        return {
          performed: false,
          error: {
            code: ErrorsEnum.NOT_FOUND,
          },
        } as UserEditResponse;
    }
  }

  /**
   * Performs the action when uuid is '7537c8bd-c71c-4164-a7bb-8935769eef94', otherwise will return a not found error code.
   *
   * @param payload Input to test.
   * @returns Mocked value.
   */
  private sendTopicUserDelete(payload: UserDeletePayload): UserDeleteResponse {
    switch (payload.uuid) {
      case '7537c8bd-c71c-4164-a7bb-8935769eef94':
        return {
          performed: true,
        } as UserDeleteResponse;
      default:
        return {
          performed: false,
          error: {
            code: ErrorsEnum.NOT_FOUND,
          },
        } as UserDeleteResponse;
    }
  }
}
