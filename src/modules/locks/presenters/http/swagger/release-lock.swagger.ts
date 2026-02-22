import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { DefaultErrorsSwaggerResponse } from '~/common/http/swagger';

const path = '/locksk';

export const ReleaseLockSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Разблокировать запись по идентификатору',
    }),
    ApiNoContentResponse({
      description: 'Блокировка успешно снята',
    }),
    ApiBadRequestResponse({
      description: 'Некорректное тело запроса',
      example: {
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: '2026-02-22T14:24:26.439Z',
        path,
        message: ['ticketId: Неверный UUID'],
      },
    }),
    ApiNotFoundResponse({
      description: 'Блокировка не найдена',
      example: {
        statusCode: HttpStatus.NOT_FOUND,
        timestamp: '2026-02-22T14:24:26.439Z',
        path,
        message: ['ticketId: Неверный UUID'],
      },
    }),
    ...DefaultErrorsSwaggerResponse(path, 'Не удалось снять блокировку'),
  );
};
