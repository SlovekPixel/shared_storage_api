import { z } from 'zod';

export const ownerSchema = z.uuid().meta({
  title: 'Идентификатор клиента',
  example: 'c2239998-aca4-4759-bc69-970fbdb294d2',
});

export const ticketSchema = z.uuid().meta({
  title: 'Идентификатор записи',
  example: 'fb60cf00-22fe-4a43-ab0a-651470ad328d',
});
