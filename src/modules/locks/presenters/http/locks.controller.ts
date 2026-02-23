import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreatePersistLockUseCase } from '~/modules/locks/application/use-cases/create-persist-lock.use-case';
import { CreatePersistLockCommand } from '~/modules/locks/application/commands/create-persist-lock.command';
import { GetLockByTicketIdUseCase } from '~/modules/locks/application/use-cases/get-lock-by-ticket-id.use-case';
import { GetLocksByOwnerIdUseCase } from '~/modules/locks/application/use-cases/get-tickets-by-owner-id.use-case';
import { Lock } from '~/modules/locks/domain/lock';
import { CreatePersistLockDto } from '~/modules/locks/presenters/http/dto/create-persist-lock.dto';
import { CreateReleaseLockDto } from '~/modules/locks/presenters/http/dto/create-release-lock.dto';
import { ReleaseByTicketIdUseCase } from '~/modules/locks/application/use-cases/release-by-ticket-id.use-case';
import { OwnerDto, ticketDto } from '~/common/schemas';
import { ApiTags } from '@nestjs/swagger';
import { LocksControllerPort } from '~/modules/locks/application/ports/locks.controller.port';
import { CreateReleaseLockCommand } from '~/modules/locks/application/commands/create-release-lock.command';
import {
  PersistLockSwagger,
  ReleaseLockSwagger,
  ShowLockByTicketIdSwagger,
  ShowLocksByOwnerIdSwagger,
} from '~/modules/locks/presenters/http/swagger';

@ApiTags('Lock')
@Controller('locks')
export class LocksHttpController implements LocksControllerPort {
  constructor(
    private readonly createPersistLock: CreatePersistLockUseCase,
    private readonly getLockByTicketId: GetLockByTicketIdUseCase,
    private readonly getLocksByOwnerId: GetLocksByOwnerIdUseCase,
    private readonly releaseByTicketId: ReleaseByTicketIdUseCase,
  ) {}

  @ShowLockByTicketIdSwagger()
  @Get('tickets/:ticketId')
  async showLockByTicketId(@Param() params: ticketDto): Promise<Lock> {
    return this.getLockByTicketId.execute(params.ticketId);
  }

  @ShowLocksByOwnerIdSwagger()
  @Get('owners/:ownerId')
  async showLocksByOwnerId(@Param() params: OwnerDto): Promise<Lock[]> {
    return this.getLocksByOwnerId.execute(params.ownerId);
  }

  @PersistLockSwagger()
  @Post('persist')
  async persistLock(
    @Body() createPersistLock: CreatePersistLockDto,
  ): Promise<Lock> {
    return this.createPersistLock.execute(
      new CreatePersistLockCommand(
        createPersistLock.ownerId,
        createPersistLock.ticketId,
      ),
    );
  }

  @ReleaseLockSwagger()
  @HttpCode(HttpStatus.OK)
  @Delete('release')
  async releaseLock(
    @Body() createReleaseLock: CreateReleaseLockDto,
  ): Promise<Lock> {
    return this.releaseByTicketId.execute(
      new CreateReleaseLockCommand(
        createReleaseLock.ticketId,
        createReleaseLock.ownerId,
      ),
    );
  }
}
