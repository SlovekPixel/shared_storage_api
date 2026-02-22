import { z } from 'zod';
import { ownerSchema, ticketSchema } from '~/common/schemas';
import { createZodDto } from 'nestjs-zod';

export const CreatePersistLockSchema = z.object({
  owner: ownerSchema,
  ticket: ticketSchema,
});

export class CreatePersistLockDto extends createZodDto(
  CreatePersistLockSchema,
) {}
export type CreatePersistLockType = z.infer<typeof CreatePersistLockSchema>;
