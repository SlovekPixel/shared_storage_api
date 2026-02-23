export class CreateReleaseLockCommand {
  constructor(
    public readonly ownerId: string,
    public readonly ticketId: string,
  ) {}
}
