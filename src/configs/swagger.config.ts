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
  .addGlobalParameters({
    name: 'accept-language',
    in: 'header',
    required: false,
    schema: {
      type: 'string',
      example: 'en',
    },
    description: 'Язык локализации ответа (ISO code)',
  })
  .addSecurityRequirements('user-name')
  .addSecurityRequirements('api-key')
  .build();
