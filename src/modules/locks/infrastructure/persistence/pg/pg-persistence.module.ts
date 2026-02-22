import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LockEntity } from '~/modules/locks/infrastructure/persistence/pg/entities/lock.entity';
import { LockRepository } from '~/modules/locks/application/ports/lock.repository';
import { PgLockRepository } from '~/modules/locks/infrastructure/persistence/pg/repositories/lock.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LockEntity])],
  providers: [
    {
      provide: LockRepository,
      useClass: PgLockRepository,
    },
  ],
  exports: [LockRepository],
})
export class PgLockPersistenceModule {}
