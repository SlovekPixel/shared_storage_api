import { LockExtended } from '~/modules/locks/domain/value-objects/lock-extended';
import { Lock } from '~/modules/locks/domain/lock';

export class LockFactory {
  create(owner: string, ticket: string, lifetime?: number): Lock {
    const createdAt = Date.now();
    const lockExtended = new LockExtended(lifetime, createdAt);

    return new Lock(owner, ticket, lockExtended);
  }
}
