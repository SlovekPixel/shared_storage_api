import { NestFactory } from '@nestjs/core';
import { AppModule } from '~/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { initZod } from '~/configs/zod.config.ru';
import { initDayjs } from '~/configs/dayjs.config';
import { swaggerConfig } from '~/configs/swagger.config';
import { ValidatedConfigService } from '~/core/custom-config/infrastructure/services/validated-config.service';

export const viteNodeApp = NestFactory.create(
  AppModule.register({
    driver: DB_REAL_TIME_LOCKS,
  }),
);

async function bootstrap() {
  const app = await viteNodeApp;

  const customConfigService = app.get(ValidatedConfigService);

  const PORT = customConfigService.get('PORT');
  const HOSTNAME = customConfigService.get('HOSTNAME');
  const API_PREFIX = customConfigService.get('API_PREFIX');

  const baseUrl = `http://${HOSTNAME}:${PORT}/${API_PREFIX}`;

  app.setGlobalPrefix(API_PREFIX);

  await initZod();
  initDayjs();

  if (import.meta.env.DEV || ENABLE_SWAGGER) {
    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup(`${API_PREFIX}/docs`, app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'none',
      },
    });

    console.warn(
      `Документация API доступна по адресу: ${baseUrl}`,
      'Bootstrap',
    );
  }

  if (import.meta.env.PROD) {
    await app.listen(PORT, HOSTNAME);
    console.log(
      `Приложение shared-storage-api PROD запущено на: ${baseUrl}`,
      'Bootstrap',
    );
  }

  if (import.meta.env.DEV) {
    console.log(
      `Приложение shared-storage-api DEV запущено на: ${baseUrl}`,
      'Bootstrap',
    );
  }
}
await bootstrap();
