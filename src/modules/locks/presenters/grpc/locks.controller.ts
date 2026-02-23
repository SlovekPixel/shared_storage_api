import { Controller } from '@nestjs/common';
import { LocksControllerPort } from '~/modules/locks/application/ports/locks.controller.port';
import { CreatePersistLockUseCase } from '~/modules/locks/application/use-cases/create-persist-lock.use-case';
import { GetLockByTicketIdUseCase } from '~/modules/locks/application/use-cases/get-lock-by-ticket-id.use-case';
import { GetLocksByOwnerIdUseCase } from '~/modules/locks/application/use-cases/get-tickets-by-owner-id.use-case';
import { GrpcMethod } from '@nestjs/microservices';
import { OwnerDto, ticketDto } from '~/common/schemas';
import { Lock } from '~/modules/locks/domain/lock';
import { CreatePersistLockDto } from '~/modules/locks/presenters/http/dto/create-persist-lock.dto';
import { CreatePersistLockCommand } from '~/modules/locks/application/commands/create-persist-lock.command';
import { CreateReleaseLockDto } from '~/modules/locks/presenters/http/dto/create-release-lock.dto';
import { CreateReleaseLockCommand } from '~/modules/locks/application/commands/create-release-lock.command';
import { ReleaseByTicketIdUseCase } from '~/modules/locks/application/use-cases/release-by-ticket-id.use-case';

@Controller()
export class LocksGrpcController implements LocksControllerPort {
  constructor(
    private readonly createPersistLock: CreatePersistLockUseCase,
    private readonly getLockByTicketId: GetLockByTicketIdUseCase,
    private readonly getLocksByOwnerId: GetLocksByOwnerIdUseCase,
    private readonly releaseByTicketId: ReleaseByTicketIdUseCase,
  ) {}

  @GrpcMethod('LockService', 'ShowLockByTicketId')
  async showLockByTicketId(request: ticketDto): Promise<Lock> {
    return await this.getLockByTicketId.execute(request.ticketId);
  }

  @GrpcMethod('LockService', 'ShowLocksByOwnerId')
  async showLocksByOwnerId(params: OwnerDto): Promise<Lock[]> {
    return this.getLocksByOwnerId.execute(params.ownerId);
  }

  @GrpcMethod('LockService', 'PersistLock')
  async persistLock(createPersistLock: CreatePersistLockDto): Promise<Lock> {
    return this.createPersistLock.execute(
      new CreatePersistLockCommand(
        createPersistLock.ownerId,
        createPersistLock.ticketId,
      ),
    );
  }

  @GrpcMethod('LockService', 'ReleaseLock')
  async releaseLock(createReleaseLock: CreateReleaseLockDto): Promise<Lock> {
    return this.releaseByTicketId.execute(
      new CreateReleaseLockCommand(
        createReleaseLock.ticketId,
        createReleaseLock.ownerId,
      ),
    );
  }
}
