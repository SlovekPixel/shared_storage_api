import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { LockDto } from '~/modules/locks/presenters/http/dto/lock.dto';
import { DefaultErrorsSwaggerResponse } from '~/common/http/swagger';

const path = '/lockks';

export const ShowLocksByOwnerIdSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Найти блокировки по идентификатору клиента',
    }),
    ApiOkResponse({
      description: 'Блокировки успешно получены',
      type: [LockDto],
    }),
    ApiBadRequestResponse({
      description: 'Некорректное тело запроса',
      example: {
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: '2026-02-22T14:24:26.439Z',
        path,
        message: ['ownerId: Неверный UUID'],
      },
    }),
    ApiNotFoundResponse({
      description: 'Клиент не найден',
      example: {
        statusCode: HttpStatus.NOT_FOUND,
        timestamp: '2026-02-22T14:24:26.439Z',
        path,
        message: ['ownerId: Неверный UUID'],
      },
    }),
    ...DefaultErrorsSwaggerResponse(path, 'Не удалось получить блокировки'),
  );
};
