export class LockEntity {
  ticket!: string;
  owner!: string;
  lifetime: number | undefined;
  createdAt!: number;
}
