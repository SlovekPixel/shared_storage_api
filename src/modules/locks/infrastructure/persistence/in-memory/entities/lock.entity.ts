export class LockEntity {
  ticketId!: string;
  ownerId!: string;
  lifetime!: number | null;
  createdAt!: number;
}
