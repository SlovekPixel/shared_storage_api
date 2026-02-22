import { Injectable } from '@nestjs/common';
import { LockRepository } from '~/modules/locks/application/ports/lock.repository';

@Injectable()
export class ReleaseByTicketIdUseCase {
  constructor(private readonly lockRepository: LockRepository) {}

  async execute(ticketId: string, owner?: string): Promise<void> {
    return await this.lockRepository.releaseByTicketId(ticketId, owner);
  }
}
