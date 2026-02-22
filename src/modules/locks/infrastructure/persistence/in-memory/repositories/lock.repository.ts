import { Injectable, NotFoundException } from '@nestjs/common';
import { LockRepository } from '~/modules/locks/application/ports/lock.repository';
import { Lock } from '~/modules/locks/domain/lock';
import { LockEntity } from '~/modules/locks/infrastructure/persistence/in-memory/entities/lock.entity';
import { LockMapper } from '~/modules/locks/infrastructure/persistence/in-memory/mappers/lock.mapper';
import { ErrorWithDetails } from '~/common/errors/error-with-details';

@Injectable()
export class InMemoryLockRepository implements LockRepository {
  private readonly locks = new Map<string, LockEntity>();

  async findByTicketId(ticket: string): Promise<Lock> {
    const entity = this.locks.get(ticket);

    if (!entity) {
      throw new NotFoundException('Not found');
    }

    return LockMapper.toDomain(entity);
  }

  async findByOwner(owner: string): Promise<Lock[]> {
    const entities = Array.from(this.locks.values());

    return entities
      .filter((item) => item.owner === owner)
      .map((item) => LockMapper.toDomain(item));
  }

  async createPersistLock(lock: Lock): Promise<Lock> {
    const persistenceModel = LockMapper.toPersistence(lock);
    this.locks.set(persistenceModel.ticket, persistenceModel);

    const newEntity = this.locks.get(persistenceModel.ticket);

    if (!newEntity)
      throw new ErrorWithDetails({
        message: 'Не удалось создать блокировку',
      });

    return LockMapper.toDomain(newEntity);
  }

  async releaseTicketById(ticketId: string): Promise<void> {
    const wasDeleted = this.locks.delete(ticketId);

    if (!wasDeleted)
      throw new NotFoundException(
        `Блокировка с идентификатором "${ticketId}" не найдена`,
      );

    return;
  }
}
