import {
  ForbiddenSwaggerResponse,
  UnauthorizedSwaggerResponse,
} from '~/common/http/swagger/api-400-responses.swagger';
import { InternalServerErrorSwaggerResponse } from '~/common/http/swagger/api-500-responses.swagger';

export * from './api-400-responses.swagger';
export * from './api-500-responses.swagger';

export const DefaultErrorsSwaggerResponse = (path: string, message: string) => [
  ForbiddenSwaggerResponse(path),
  UnauthorizedSwaggerResponse(path),
  InternalServerErrorSwaggerResponse(path, message),
];
