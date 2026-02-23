import { z } from 'zod';
import { ownerSchema, ticketSchema } from '~/common/schemas';
import { createZodDto } from 'nestjs-zod';

const CreateReleaseLockSchema = z.object({
  ownerId: ownerSchema,
  ticketId: ticketSchema,
});

export class CreateReleaseLockDto extends createZodDto(
  CreateReleaseLockSchema,
) {}
