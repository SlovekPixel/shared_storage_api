export class CreatePersistLockCommand {
  constructor(
    public readonly owner: string,
    public readonly ticket: string,
  ) {}
}
