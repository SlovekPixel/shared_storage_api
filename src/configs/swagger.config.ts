import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('shared-storage-api')
  .setVersion('1.0.0')
  .addApiKey(
    {
      type: 'apiKey',
      name: 'user-name',
      in: 'header',
    },
    'user-name',
  )
  .addApiKey(
    {
      type: 'apiKey',
      name: 'api-key',
      in: 'header',
    },
    'api-key',
  )
  .addSecurityRequirements('user-name')
  .addSecurityRequirements('api-key')
  .build();
