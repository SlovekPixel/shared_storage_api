import { Injectable, NestMiddleware, Scope } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';

@Injectable({ scope: Scope.REQUEST })
export class SsaHeadersMiddleware implements NestMiddleware {
  constructor() {}

  use(request: Request, _: Response, next: NextFunction) {
    const isDevelopment = import.meta.env.DEV;

    request.ssaHeaders = isDevelopment
      ? {
          'X-Request-ID': `${randomUUID()}-dev`,
        }
      : {
          'X-Request-ID': randomUUID(),
        };

    next();
  }
}
