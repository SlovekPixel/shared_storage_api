import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { DefaultErrorsSwaggerResponse } from '~/common/http/swagger';
import { LockDto } from '~/modules/locks/presenters/http/dto/lock.dto';

const path = '/locksk';

export const ReleaseLockSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Разблокировать запись по идентификатору',
    }),
    ApiOkResponse({
      description: 'Блокировка успешно снята',
      type: LockDto,
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
