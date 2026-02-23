import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { LockDto } from '~/modules/locks/presenters/http/dto/lock.dto';
import { DefaultErrorsSwaggerResponse } from '~/common/http/swagger';

const path = '/loscksk';

export const PersistLockSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Постоянная блокировка записи по идентификатору',
    }),
    ApiOkResponse({
      description: 'Запись заблокирована',
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
    ...DefaultErrorsSwaggerResponse(path, 'Не удалось заблокировать запись'),
  );
};
