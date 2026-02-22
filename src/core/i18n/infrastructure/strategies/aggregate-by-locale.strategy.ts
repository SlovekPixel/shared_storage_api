import {
  ContextId,
  ContextIdFactory,
  ContextIdResolver,
  ContextIdResolverFn,
  ContextIdStrategy,
  HostComponentInfo,
} from '@nestjs/core';
import { Request } from 'express';
import { pick } from 'accept-language-parser';
import { I18nService } from '~/core/i18n/infrastructure/services/i18n.service';

export class AggregateByLocaleContextIdStrategy implements ContextIdStrategy {
  // A collection of context identifiers representing separate DI sub-trees per locale
  private readonly locales = new Map<string, ContextId>();

  attach(
    contextId: ContextId,
    request: Request,
  ): ContextIdResolverFn | ContextIdResolver {
    const neededLanguage =
      request.headers?.['accept-language'] ?? I18nService.defaultLanguage;

    const localeCode =
      pick(I18nService.supportedLanguages, neededLanguage) ??
      I18nService.defaultLanguage;

    const currentLocaleSubTreeId = this.locales.get(localeCode);
    const localeSubTreeId: ContextId =
      currentLocaleSubTreeId ?? ContextIdFactory.create();

    if (!currentLocaleSubTreeId) {
      // Update a new context id
      this.locales.set(localeCode, localeSubTreeId);
      setTimeout(() => this.locales.delete(localeCode), 3000);
    }

    return {
      payload: { localeCode },
      resolve: (info: HostComponentInfo) =>
        info.isTreeDurable ? localeSubTreeId : contextId,
    };
  }
}
