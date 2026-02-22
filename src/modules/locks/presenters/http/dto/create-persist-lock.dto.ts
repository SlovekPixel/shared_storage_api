import { z } from 'zod';
import { ownerSchema, ticketSchema } from '~/common/schemas';
import { createZodDto } from 'nestjs-zod';

const CreatePersistLockSchema = z.object({
  owner: ownerSchema,
  ticket: ticketSchema,
});

export class CreatePersistLockDto extends createZodDto(
  CreatePersistLockSchema,
) {}
