import { Injectable } from '@nestjs/common';
import { LockRepository } from '~/modules/locks/application/ports/lock.repository';
import { Lock } from '~/modules/locks/domain/lock';

@Injectable()
export class GetLockByTicketIdUseCase {
  constructor(private readonly lockRepository: LockRepository) {}

  async execute(ticketId: string): Promise<Lock> {
    return this.lockRepository.findByTicketId(ticketId);
  }
}
