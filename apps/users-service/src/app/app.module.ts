import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabasePlatform } from '@shared/database/config';
import { entities } from '@shared/database/entities';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRepositoryModule } from './repositories/users/users-repository.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...DatabasePlatform.config,
      entities,
      synchronize: true,
    }),
    //TypeOrmModule.forFeature(entities),
    UserRepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
