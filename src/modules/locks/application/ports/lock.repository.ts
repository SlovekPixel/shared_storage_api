import { Lock } from '~/modules/locks/domain/lock';

export abstract class LockRepository {
  abstract findByTicketId(ticketId: string): Promise<Lock>;
  abstract findByOwner(owner: string): Promise<Lock[]>;
  abstract createPersistLock(lock: Lock): Promise<Lock>;
  abstract releaseTicketById(ticketId: string): Promise<void>;
}
