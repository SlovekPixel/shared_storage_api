import { Inject, Injectable, Scope } from '@nestjs/common';
import type * as Schema from '~/assets/locales/ru.json';
import * as ru from '~/assets/locales/ru.json';
import * as en from '~/assets/locales/en.json';
import { REQUEST } from '@nestjs/core';
import format from 'string-format';
import _ from 'lodash';

type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

type Join<T extends string[]> = T extends []
  ? never
  : T extends [infer F]
    ? F
    : T extends [infer F, ...infer R]
      ? F extends string
        ? `${F}.${Join<Extract<R, string[]>>}`
        : never
      : string;

@Injectable({ scope: Scope.REQUEST, durable: true })
export class I18nService {
  constructor(
    @Inject(REQUEST) private readonly payload: { localeCode: string },
  ) {}

  public static readonly defaultLanguage = 'ru';
  public static readonly supportedLanguages = ['ru', 'en'];
  private readonly locales: Record<string, typeof Schema> = { ru, en };

  translate(
    key: Join<PathsToStringProps<typeof Schema>>,
    ...args: Array<string | Record<string, unknown>>
  ): string {
    const locale =
      this.locales[this.payload.localeCode ?? I18nService.defaultLanguage];

    // To support dot notation: "ERRORS.OWNER_MISMATCH"
    // const text: string = key.split('.').reduce((o, i) => o[i], locale);
    const text = _.get(locale, key, key);

    return format(text, ...args);
  }
}
