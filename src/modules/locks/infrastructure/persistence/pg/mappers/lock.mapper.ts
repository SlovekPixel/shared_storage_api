import { LockEntity } from '~/modules/locks/infrastructure/persistence/pg/entities/lock.entity';
import { Lock } from '~/modules/locks/domain/lock';
import { LockExtended } from '~/modules/locks/domain/value-objects/lock-extended';

export class LockMapper {
  static toDomain(lockEntity: LockEntity): Lock {
    const lockExtended = new LockExtended(
      lockEntity.lifetime,
      lockEntity.createdAt,
    );

    return new Lock(lockEntity.owner, lockEntity.ticket, lockExtended);
  }

  static toPersistence(lock: Lock): LockEntity {
    const entity = new LockEntity();

    entity.owner = lock.owner;
    entity.ticket = lock.ticket;
    entity.lifetime = lock.extended.lifetime;
    entity.createdAt = lock.extended.createdAt;

    return entity;
  }
}
