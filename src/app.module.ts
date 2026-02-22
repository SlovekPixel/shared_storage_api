import { Module } from '@nestjs/common';
import { LocksModule } from './modules/locks/locks.module';
import { CoreModule } from '~/core/core/core.module';
import { ApplicationBootstrapOptions } from '~/common/interfaces/application-bootstrap-options.interface';
import { LocksInfrastructureModule } from '~/modules/locks/infrastructure/locks-infrastructure.module';
import { CustomConfigModule } from '~/core/custom-config/custom-config.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE, APP_FILTER } from '@nestjs/core';
import { CustomExceptionsFilter } from '~/filters/exceptions/custom-exceptions.filter';

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        CustomConfigModule,
        LocksModule.withInfrastructure(
          LocksInfrastructureModule.use(options.driver),
        ),
      ],
      providers: [
        {
          provide: APP_PIPE,
          useClass: ZodValidationPipe,
        },
        {
          provide: APP_FILTER,
          useClass: CustomExceptionsFilter,
        },
      ],
    };
  }
}
