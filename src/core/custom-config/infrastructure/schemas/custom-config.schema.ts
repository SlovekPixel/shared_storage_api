import { z } from 'zod';

export const CustomConfigSchema = z.object({
  API_PREFIX: z.string().default('api'),
  HOSTNAME: z.string().default('127.0.0.1'),
  PORT: z.coerce.number().default(3022),
  LOG_LEVEL: z
    .enum(['error', 'warn', 'info', 'http', 'verbose', 'debug'])
    .default('warn'),
});

export type CustomConfigSchemaType = z.infer<typeof CustomConfigSchema>;
