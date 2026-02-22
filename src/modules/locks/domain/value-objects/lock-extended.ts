export class LockExtended {
  constructor(
    readonly lifetime: number | undefined,
    readonly createdAt: number,
  ) {}

  isLocked() {
    const lifetime = this.lifetime ?? 0;

    return this.createdAt + lifetime > Date.now();
  }
}
