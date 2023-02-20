import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { UserEntity } from '@shared/database/entities/user.entity';

export class UserRepositoryMock {
  /**
   * Returns an User for uuid '7b093ca2-dfe7-4f8e-8f90-76174a722bfd', throw EntityNotFoundError otherwise.
   *
   * @param uuid
   * @returns
   */
  async findByUUID(uuid: string): Promise<UserEntity> {
    switch (uuid) {
      case '7b093ca2-dfe7-4f8e-8f90-76174a722bfd':
        return {
          uuid: '7b093ca2-dfe7-4f8e-8f90-76174a722bfd',
          name: 'Thomas A. Anderson',
          email: 'thomas.anderson@matrix.ai',
          location: {
            latitude: '-23.433982',
            longitude: '-46.476069',
          },
        } as UserEntity;
      default:
        throw new EntityNotFoundError(UserEntity, null);
    }
  }

  /**
   * Returns true for email 'test-jest-001@jest.com', throw QueryFailedError otherwise (probably duplicated).
   *
   * @param entity User data.
   * @returns True if is updated, throw error otherwise.
   */
  async insert(entity: UserEntity): Promise<boolean> {
    switch (entity.email) {
      case 'test-jest-001@jest.com':
        return true;
      default:
        throw new QueryFailedError('', [], new Error('duplicate key'));
    }
  }

  /**
   * Returns true for uuid '7b093ca2-dfe7-4f8e-8f90-76174a722bfd', false for uuid '7b093ca2-dfe7-4f8e-8f90-76174a722bf5' and throw QueryFailedError otherwise.
   *
   * @param uuid User to be updated.
   * @param entity User data.
   * @returns True if is updated, false otherwise (probably the user does not exists).
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(uuid: string, entity: Partial<UserEntity>): Promise<boolean> {
    switch (uuid) {
      case '7b093ca2-dfe7-4f8e-8f90-76174a722bfd':
        return true;
      case '7b093ca2-dfe7-4f8e-8f90-76174a722bf5':
        return false;
      default:
        throw new QueryFailedError('', [], null);
    }
  }

  /**
   * Returns true for uuid '7b093ca2-dfe7-4f8e-8f90-76174a722bfd', false for uuid '7b093ca2-dfe7-4f8e-8f90-76174a722bf5' and throw QueryFailedError otherwise.
   *
   * @param uuid User to be deleted.
   * @returns True if is deleted, false otherwise (probably the user does not exists).
   */
  async delete(uuid: string): Promise<boolean> {
    switch (uuid) {
      case '7b093ca2-dfe7-4f8e-8f90-76174a722bfd':
        return true;
      case '7b093ca2-dfe7-4f8e-8f90-76174a722bf5':
        return false;
      default:
        throw new QueryFailedError('', [], null);
    }
  }
}
