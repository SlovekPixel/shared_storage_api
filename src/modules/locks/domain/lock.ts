import { LockExtended } from '~/modules/locks/domain/value-objects/lock-extended';

export class Lock {
  constructor(
    public ownerId: string,
    public ticketId: string,
    public extended: LockExtended,
  ) {}
}
