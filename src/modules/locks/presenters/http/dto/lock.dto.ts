import { createZodDto } from 'nestjs-zod';
import { LockSchema } from '~/modules/locks/application/schemas/lock-schema';

export class LockDto extends createZodDto(LockSchema) {}
