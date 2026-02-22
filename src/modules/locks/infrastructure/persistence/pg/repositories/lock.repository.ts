import { Injectable, NotFoundException } from '@nestjs/common';
import { LockRepository } from '~/modules/locks/application/ports/lock.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { LockEntity } from '~/modules/locks/infrastructure/persistence/pg/entities/lock.entity';
import { Repository } from 'typeorm';
import { Lock } from '~/modules/locks/domain/lock';
import { LockMapper } from '~/modules/locks/infrastructure/persistence/pg/mappers/lock.mapper';

@Injectable()
export class PgLockRepository implements LockRepository {
  constructor(
    @InjectRepository(LockEntity)
    private readonly lockRepository: Repository<LockEntity>,
  ) {}

  async findByTicketId(ticket: string): Promise<Lock> {
    const entity = await this.lockRepository.findOne({
      where: { ticket },
    });

    if (!entity) {
      throw new NotFoundException('No ticket found');
    }

    return LockMapper.toDomain(entity);
  }

  async findByOwner(owner: string): Promise<Lock[]> {
    const entities = await this.lockRepository.find({
      where: { owner },
    });

    return entities.map((item) => LockMapper.toDomain(item));
  }

  async createPersistLock(lock: Lock): Promise<Lock> {
    const persistenceModel = LockMapper.toPersistence(lock);
    const newEntity = await this.lockRepository.save(persistenceModel);

    return LockMapper.toDomain(newEntity);
  }

  async releaseTicketById(ticketId: string): Promise<void> {
    const result = await this.lockRepository.delete({ ticket: ticketId });

    if (result.affected === 0)
      throw new NotFoundException(
        `Блокировка с идентификатором "${ticketId}" не найдена`,
      );

    return;
  }
}
