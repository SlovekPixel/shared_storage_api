import { Lock } from '~/modules/locks/domain/lock';

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
   * @param ownerId - Идентификатор владельца
   * @returns Массив блокировок
   */
  abstract findByOwner(ownerId: string): Promise<Lock[]>;

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
   * Если указан ownerId, освобождение произойдёт только при совпадении владельца
   *
   * @param ticketId - Идентификатор записи
   * @param ownerId - (опционально) Идентификатор владельца
   */
  abstract releaseByTicketId(ticketId: string, ownerId?: string): Promise<Lock>;
}
