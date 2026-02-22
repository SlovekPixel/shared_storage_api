import { z } from 'zod';

export const ExceptionResponseSchema = z.object({
  details: z.string().optional().meta({
    title: 'Детали ошибки',
  }),
  message: z.union([z.string(), z.array(z.string())]).meta({
    title: 'Основное сообщение об ошибке',
  }),
  path: z.string().meta({
    title: 'URL по которому выполнен запрос',
  }),
  statusCode: z.number().meta({
    title: 'Статус код запроса',
  }),
  timestamp: z.string().meta({
    title: 'Временная метка',
  }),
});

export type ExceptionResponseType = z.infer<typeof ExceptionResponseSchema>;
