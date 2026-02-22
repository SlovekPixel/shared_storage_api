import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LocksModule } from './modules/locks/locks.module';
import { CoreModule } from '~/core/core/core.module';
import { ApplicationBootstrapOptions } from '~/common/interfaces/application-bootstrap-options.interface';
import { LocksInfrastructureModule } from '~/modules/locks/infrastructure/locks-infrastructure.module';
import { CustomConfigModule } from '~/core/custom-config/custom-config.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE, APP_FILTER, ContextIdFactory } from '@nestjs/core';
import { CustomExceptionsFilter } from '~/filters/exceptions/custom-exceptions.filter';
import { AggregateByLocaleContextIdStrategy } from '~/core/i18n/infrastructure/strategies/aggregate-by-locale.strategy';
import { I18nModule } from '~/core/i18n/i18n.module';
import { SsaHeadersMiddleware } from '~/core/core/presentation/http/middlewares/ssa-headers.middleware';

ContextIdFactory.apply(new AggregateByLocaleContextIdStrategy());

@Module({
  imports: [CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SsaHeadersMiddleware).forRoutes({
      path: '*path',
      method: RequestMethod.ALL,
    });
  }

  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        // CORE
        CoreModule.forRoot(options),
        CustomConfigModule,
        I18nModule,

        // modules
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
