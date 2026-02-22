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
import { ReleaseLockDto } from '~/modules/locks/presenters/http/dto/release-lock.dto';
import { ReleaseByTicketIdUseCase } from '~/modules/locks/application/use-cases/release-by-ticket-id.use-case';
import { OwnerDto, ticketDto } from '~/common/schemas';
import { ApiTags } from '@nestjs/swagger';
import { ShowLockByTicketIdSwagger } from '~/modules/locks/presenters/http/swagger/show-lock-by-ticket-id.swagger';
import { ShowLocksByOwnerIdSwagger } from '~/modules/locks/presenters/http/swagger/show-locks-by-owner-id.swagger';
import { ReleaseLockSwagger } from '~/modules/locks/presenters/http/swagger/release-lock.swagger';
import { PersistLockSwagger } from '~/modules/locks/presenters/http/swagger/persist-lock.swagger';

@ApiTags('Lock')
@Controller('locks')
export class LocksController {
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
        createPersistLock.owner,
        createPersistLock.ticket,
      ),
    );
  }

  @ReleaseLockSwagger()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('tickets/:ticketId')
  async releaseLock(
    @Param() params: ticketDto,
    @Body() releaseLock: ReleaseLockDto,
  ): Promise<void> {
    return this.releaseByTicketId.execute(params.ticketId, releaseLock.owner);
  }
}
