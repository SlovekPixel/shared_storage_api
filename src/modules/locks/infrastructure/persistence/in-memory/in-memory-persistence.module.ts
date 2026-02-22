import { Module } from '@nestjs/common';
import { LockRepository } from '~/modules/locks/application/ports/lock.repository';
import { InMemoryLockRepository } from '~/modules/locks/infrastructure/persistence/in-memory/repositories/lock.repository';
import { I18nModule } from '~/core/i18n/i18n.module';

@Module({
  imports: [I18nModule],
  providers: [
    {
      provide: LockRepository,
      useClass: InMemoryLockRepository,
    },
  ],
  exports: [LockRepository],
})
export class InMemoryLockPersistenceModule {}
