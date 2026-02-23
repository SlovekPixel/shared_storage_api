import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LockRepository } from '~/modules/locks/application/ports/lock.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { LockEntity } from '~/modules/locks/infrastructure/persistence/pg/entities/lock.entity';
import { Repository } from 'typeorm';
import { Lock } from '~/modules/locks/domain/lock';
import { LockMapper } from '~/modules/locks/infrastructure/persistence/pg/mappers/lock.mapper';
import { I18nService } from '~/core/i18n/infrastructure/services/i18n.service';

@Injectable()
export class PgLockRepository implements LockRepository {
  constructor(
    @InjectRepository(LockEntity)
    private readonly lockRepository: Repository<LockEntity>,
    private readonly i18nService: I18nService,
  ) {}

  async findByTicketId(ticketId: string): Promise<Lock> {
    const entity = await this.lockRepository.findOne({
      where: { ticketId: ticketId },
    });

    if (!entity)
      throw new NotFoundException(
        this.i18nService.translate('ERRORS.NOT_FOUND_BY_TICKET_ID', {
          ticketId,
        }),
      );

    return LockMapper.toDomain(entity);
  }

  async findByOwner(ownerId: string): Promise<Lock[]> {
    const entities = await this.lockRepository.find({
      where: { ownerId },
    });

    return entities.map((item) => LockMapper.toDomain(item));
  }

  async createPersistLock(lock: Lock): Promise<Lock> {
    const persistenceModel = LockMapper.toPersistence(lock);
    const newEntity = await this.lockRepository.save(persistenceModel);

    return LockMapper.toDomain(newEntity);
  }

  async releaseByTicketId(ticketId: string, ownerId?: string): Promise<Lock> {
    const currentLock = await this.findByTicketId(ticketId);

    if (ownerId && currentLock.ownerId !== ownerId)
      throw new ForbiddenException(
        this.i18nService.translate('ERRORS.OWNER_MISMATCH'),
      );

    const result = await this.lockRepository.delete({
      ticketId,
      ownerId,
    });

    if (result.affected === 0)
      throw new ForbiddenException(
        this.i18nService.translate('ERRORS.NOT_FOUND_BY_TICKET_ID', {
          ticketId,
        }),
      );

    return currentLock;
  }
}
