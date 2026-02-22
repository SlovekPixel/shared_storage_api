import { Injectable } from '@nestjs/common';
import { CreatePersistLockCommand } from '~/modules/locks/application/commands/create-persist-lock.command';
import { LockRepository } from '~/modules/locks/application/ports/lock.repository';
import { LockFactory } from '~/modules/locks/domain/factories/lock.factory';
import { Lock } from '~/modules/locks/domain/lock';

@Injectable()
export class CreatePersistLockUseCase {
  constructor(
    private readonly lockRepository: LockRepository,
    private readonly lockFactory: LockFactory,
  ) {}

  async execute(
    createPersisLockCommand: CreatePersistLockCommand,
  ): Promise<Lock> {
    const lock = this.lockFactory.create(
      createPersisLockCommand.owner,
      createPersisLockCommand.ticket,
    );

    return this.lockRepository.createPersistLock(lock);
  }
}
