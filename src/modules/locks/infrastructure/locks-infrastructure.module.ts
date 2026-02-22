import { Module } from '@nestjs/common';
import { PgLockPersistenceModule } from '~/modules/locks/infrastructure/persistence/pg/pg-persistence.module';
import { InMemoryLockPersistenceModule } from '~/modules/locks/infrastructure/persistence/in-memory/in-memory-persistence.module';

@Module({})
export class LocksInfrastructureModule {
  static use(driver: typeof DB_REAL_TIME_LOCKS) {
    const persistenceModule =
      driver === 'pg' ? PgLockPersistenceModule : InMemoryLockPersistenceModule;

    return {
      module: LocksInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
