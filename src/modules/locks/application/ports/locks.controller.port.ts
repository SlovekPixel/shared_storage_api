import { Lock } from '~/modules/locks/domain/lock';
import { OwnerDto, ticketDto } from '~/common/schemas';
import { CreatePersistLockCommand } from '~/modules/locks/application/commands/create-persist-lock.command';

export abstract class LocksControllerPort {
  abstract showLockByTicketId(params: ticketDto): Promise<Lock>;
  abstract showLocksByOwnerId(params: OwnerDto): Promise<Lock[]>;
  abstract persistLock(
    createPersistLock: CreatePersistLockCommand,
  ): Promise<Lock>;
  abstract releaseLock(params: ticketDto, releaseLock: OwnerDto): Promise<Lock>;
}
