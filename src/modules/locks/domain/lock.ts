import { LockExtended } from '~/modules/locks/domain/value-objects/lock-extended';

export class Lock {
  constructor(
    public owner: string,
    public ticket: string,
    public extended: LockExtended,
  ) {}
}
