import { DynamicModule, Module, Type } from '@nestjs/common';
import { LockFactory } from '~/modules/locks/domain/factories/lock.factory';
import { CreatePersistLockUseCase } from '~/modules/locks/application/use-cases/create-persist-lock.use-case';
import { GetLockByTicketIdUseCase } from '~/modules/locks/application/use-cases/get-lock-by-ticket-id.use-case';
import { GetLocksByOwnerIdUseCase } from '~/modules/locks/application/use-cases/get-tickets-by-owner-id.use-case';
import { LocksController } from '~/modules/locks/presenters/http/locks.controller';

@Module({
  controllers: [LocksController],
  providers: [
    LockFactory,
    CreatePersistLockUseCase,
    GetLockByTicketIdUseCase,
    GetLocksByOwnerIdUseCase,
  ],
})
export class LocksModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: LocksModule,
      imports: [infrastructureModule],
    };
  }
}
