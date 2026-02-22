import { Module } from '@nestjs/common';
import { ApplicationBootstrapOptions } from '~/common/interfaces/application-bootstrap-options.interface';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports = [
      ...(options.driver === 'pg'
        ? [
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              password: 'postgres',
              username: 'postgres',
              autoLoadEntities: true,
            }),
          ]
        : []),
    ];

    return {
      module: CoreModule,
      imports,
    };
  }
}
