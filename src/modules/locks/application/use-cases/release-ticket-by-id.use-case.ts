import { Injectable } from '@nestjs/common';
import { LockRepository } from '~/modules/locks/application/ports/lock.repository';

@Injectable()
export class ReleaseTicketByIdUseCase {
  constructor(private readonly lockRepository: LockRepository) {}

  async execute(ticketId: string): Promise<void> {
    await this.lockRepository.releaseTicketById(ticketId);
  }
}
