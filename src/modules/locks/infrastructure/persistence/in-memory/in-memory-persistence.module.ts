import { Module } from '@nestjs/common';
import { LockRepository } from '~/modules/locks/application/ports/lock.repository';
import { InMemoryLockRepository } from '~/modules/locks/infrastructure/persistence/in-memory/repositories/lock.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: LockRepository,
      useClass: InMemoryLockRepository,
    },
  ],
  exports: [LockRepository],
})
export class InMemoryLockPersistenceModule {}
