import path from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomConfigSchema } from '~/core/custom-config/infrastructure/schemas/custom-config.schema';
import { ValidatedConfigService } from '~/core/custom-config/infrastructure/services/validated-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ...(import.meta.env.DEV && {
        envFilePath: path.resolve(process.cwd(), '../../../.env'),
      }),
      isGlobal: true,
      validate: (c) => CustomConfigSchema.parse(c),
    }),
  ],
  providers: [ValidatedConfigService],
  exports: [ValidatedConfigService],
})
export class CustomConfigModule {}
