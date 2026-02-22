import { Lock } from '~/modules/locks/domain/lock';
import { LockOperationStatuses } from '~/modules/locks/application/constants/lock-operation-statuses';

export abstract class LockRepository {
  /**
   * Найти блокировку по идентификатору записи
   *
   * @param ticketId - Идентификатор записи
   * @returns Найденная блокировка
   */
  abstract findByTicketId(ticketId: string): Promise<Lock>;

  /**
   * Найти все блокировки, принадлежащие владельцу
   *
   * @param owner - Идентификатор владельца
   * @returns Массив блокировок
   */
  abstract findByOwner(owner: string): Promise<Lock[]>;

  /**
   * Создать и сохранить новую постоянную блокировку
   *
   * @param lock - Доменная сущность блокировки
   * @returns Сохранённая блокировка
   */
  abstract createPersistLock(lock: Lock): Promise<Lock>;

  /**
   * Освободить блокировку по идентификатору записи
   *
   * Если указан owner, освобождение произойдёт только при совпадении владельца
   *
   * @param ticketId - Идентификатор записи
   * @param owner - (опционально) Идентификатор владельца
   */
  abstract releaseByTicketId(
    ticketId: string,
    owner?: string,
  ): Promise<LockOperationStatuses>;
}
