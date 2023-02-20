import { Test } from '@nestjs/testing';

import { AppService } from './app.service';
import { UserRepository } from './repositories/users/users.repository';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: UserRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
