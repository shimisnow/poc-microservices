import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '@shared/database/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async findByUUID(uuid: string): Promise<UserEntity> {
    return await this.usersRepository.findOneOrFail({
      where: {
        uuid,
      },
    });
  }

  async insert(entity: UserEntity): Promise<boolean> {
    await this.usersRepository.insert(entity);
    return true;
  }

  async update(uuid: string, entity: Partial<UserEntity>): Promise<boolean> {
    const result: UpdateResult = await this.usersRepository.update(
      { uuid },
      entity
    );

    if (result.affected > 0) {
      return true;
    } else {
      return false;
    }
  }

  async delete(uuid: string): Promise<boolean> {
    const result: DeleteResult = await this.usersRepository.delete({ uuid });

    if (result.affected > 0) {
      return true;
    } else {
      return false;
    }
  }
}
