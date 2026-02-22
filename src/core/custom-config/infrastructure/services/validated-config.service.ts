import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomConfigSchemaType } from '~/core/custom-config/infrastructure/schemas/custom-config.schema';

@Injectable()
export class ValidatedConfigService {
  constructor(private readonly configService: ConfigService) {}

  get<const T extends keyof CustomConfigSchemaType>(
    key: T,
  ): CustomConfigSchemaType[T] {
    return this.configService.get(key as string) as CustomConfigSchemaType[T];
  }
}
