import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('locks')
export class LockEntity {
  @PrimaryColumn('uuid')
  ticketId!: string;

  @Column()
  ownerId!: string;

  @Column()
  lifetime!: number | null;

  @CreateDateColumn()
  createdAt!: number;
}
