import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LockRepository } from '~/modules/locks/application/ports/lock.repository';
import { Lock } from '~/modules/locks/domain/lock';
import { LockEntity } from '~/modules/locks/infrastructure/persistence/in-memory/entities/lock.entity';
import { LockMapper } from '~/modules/locks/infrastructure/persistence/in-memory/mappers/lock.mapper';
import { ErrorWithDetails } from '~/common/errors/error-with-details';
import { I18nService } from '~/core/i18n/infrastructure/services/i18n.service';

@Injectable()
export class InMemoryLockRepository implements LockRepository {
  constructor(private readonly i18nService: I18nService) {}

  private readonly locks = new Map<string, LockEntity>();

  async findByTicketId(ticketId: string): Promise<Lock> {
    const entity = this.locks.get(ticketId);

    if (!entity)
      throw new NotFoundException(
        this.i18nService.translate('ERRORS.NOT_FOUND_BY_TICKET_ID', {
          ticketId,
        }),
      );

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
        message: this.i18nService.translate('ERRORS.CREATE_LOCK_FAILED'),
      });

    return LockMapper.toDomain(newEntity);
  }

  async releaseByTicketId(ticketId: string, owner?: string): Promise<void> {
    if (owner) {
      const currentLock = await this.findByTicketId(ticketId);

      if (currentLock.owner !== owner)
        throw new ForbiddenException(
          this.i18nService.translate('ERRORS.OWNER_MISMATCH'),
        );
    }

    const wasDeleted = this.locks.delete(ticketId);

    if (!wasDeleted)
      throw new ForbiddenException(
        this.i18nService.translate('ERRORS.NOT_FOUND_BY_TICKET_ID', {
          ticketId,
        }),
      );

    return;
  }
}
