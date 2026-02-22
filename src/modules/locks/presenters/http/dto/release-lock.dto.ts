import { z } from 'zod';
import { ownerSchema } from '~/common/schemas';
import { createZodDto } from 'nestjs-zod';

const ReleaseLockSchema = z.object({
  owner: ownerSchema,
});

export class ReleaseLockDto extends createZodDto(ReleaseLockSchema) {}
