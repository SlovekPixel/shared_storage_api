import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('locks')
export class LockEntity {
  @PrimaryColumn('uuid')
  ticket!: string;

  @Column()
  owner!: string;

  @Column()
  lifetime: number | undefined;

  @CreateDateColumn()
  createdAt!: number;
}
