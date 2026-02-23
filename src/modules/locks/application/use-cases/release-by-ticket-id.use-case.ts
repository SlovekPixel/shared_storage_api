import { Injectable } from '@nestjs/common';
import { LockRepository } from '~/modules/locks/application/ports/lock.repository';
import { CreateReleaseLockCommand } from '~/modules/locks/application/commands/create-release-lock.command';
import { Lock } from '~/modules/locks/domain/lock';

@Injectable()
export class ReleaseByTicketIdUseCase {
  constructor(private readonly lockRepository: LockRepository) {}

  async execute(
    createReleaseLockCommand: CreateReleaseLockCommand,
  ): Promise<Lock> {
    return await this.lockRepository.releaseByTicketId(
      createReleaseLockCommand.ticketId,
      createReleaseLockCommand.ownerId,
    );
  }
}
