import { LockExtended } from '~/modules/locks/domain/value-objects/lock-extended';
import { Lock } from '~/modules/locks/domain/lock';

export class LockFactory {
  create(
    ownerId: string,
    ticketId: string,
    lifetime: number | null = null,
  ): Lock {
    const createdAt = Date.now();
    const lockExtended = new LockExtended(lifetime, createdAt);

    return new Lock(ownerId, ticketId, lockExtended);
  }
}
