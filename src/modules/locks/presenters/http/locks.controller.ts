import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePersistLockUseCase } from '~/modules/locks/application/use-cases/create-persist-lock.use-case';
import { CreatePersistLockCommand } from '~/modules/locks/application/commands/create-persist-lock.command';
import { GetLockByTicketIdUseCase } from '~/modules/locks/application/use-cases/get-lock-by-ticket-id.use-case';
import { GetLocksByOwnerIdUseCase } from '~/modules/locks/application/use-cases/get-tickets-by-owner-id.use-case';
import { Lock } from '~/modules/locks/domain/lock';
import { CreatePersistLockDto } from '~/modules/locks/presenters/http/dto/create-persist-lock.dto';

@Controller('locks')
export class LocksController {
  constructor(
    private readonly createPersistLockUseCase: CreatePersistLockUseCase,
    private readonly getLockByTicketIdUseCase: GetLockByTicketIdUseCase,
    private readonly getLocksByOwnerIdUseCase: GetLocksByOwnerIdUseCase,
  ) {}

  @Get('tickets/:ticketId')
  async getLockByTicketId(@Param('ticketId') ticketId: string): Promise<Lock> {
    return this.getLockByTicketIdUseCase.execute(ticketId);
  }

  @Get('owners/:ownerId')
  async getLocksByOwnerId(@Param('ownerId') ownerId: string): Promise<Lock[]> {
    return this.getLocksByOwnerIdUseCase.execute(ownerId);
  }

  @Post('persist')
  async persistLock(
    @Body()
    createPersistLock: CreatePersistLockDto,
  ) {
    return this.createPersistLockUseCase.execute(
      new CreatePersistLockCommand(
        createPersistLock.owner,
        createPersistLock.ticket,
      ),
    );
  }

  @Post('release')
  async releaseLock() {
    return;
  }
}
