import { z } from 'zod';
import { Lock } from '~/modules/locks/domain/lock';
import { LockExtended } from '~/modules/locks/domain/value-objects/lock-extended';
import { ownerSchema, ticketSchema } from '~/common/schemas';

const ExtendedLockSchema: z.ZodType<LockExtended> = z.object({
  lifetime: z.number().int().nullable().meta({
    title: 'Время блокировки записи (секунды)',
    example: 10,
  }),
  createdAt: z.number().int().meta({
    title: 'Время создания записи',
    example: 1771769711350,
  }),
});

export const LockSchema: z.ZodType<Lock> = z.object({
  owner: ownerSchema,
  ticket: ticketSchema,
  extended: ExtendedLockSchema,
});
