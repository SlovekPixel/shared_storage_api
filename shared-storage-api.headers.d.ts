import type * as express from 'express';

declare module 'express' {
  export interface Request extends express.Request {
    ssaHeaders?: {
      'X-Request-ID': string;
    };
  }
}
