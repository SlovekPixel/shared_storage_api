import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LockRepository } from '~/modules/locks/application/ports/lock.repository';
import { LockOperationStatuses } from '~/modules/locks/application/constants/lock-operation-statuses';

@Injectable()
export class ReleaseByTicketIdUseCase {
  constructor(private readonly lockRepository: LockRepository) {}

  async execute(ticketId: string, owner?: string): Promise<void> {
    const status = await this.lockRepository.releaseByTicketId(ticketId, owner);

    if (status === LockOperationStatuses.OWNER_MISMATCH)
      throw new ForbiddenException(
        `У вас недостаточно прав для выполнения этого действия`,
      );

    if (status === LockOperationStatuses.NOT_FOUND)
      throw new NotFoundException(
        `Блокировка с идентификатором "${ticketId}" не найдена`,
      );

    return;
  }
}
