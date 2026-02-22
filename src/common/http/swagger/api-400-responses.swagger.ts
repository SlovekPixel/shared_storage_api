import { ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export const ForbiddenSwaggerResponse = () =>
  ApiForbiddenResponse({
    description: 'Недостаточно прав для запроса',
    schema: {
      type: 'object',
      example: {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'У вас недостаточно прав для выполнения этого действия',
        timestamp: '2025-10-28T11:44:41.107Z',
        path: 'api/test-url',
      },
    },
  });

export const UnauthorizedSwaggerResponse = () =>
  ApiUnauthorizedResponse({
    description: 'Некорректные данные входа',
    schema: {
      type: 'object',
      example: {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Получены некорректные данные юзера и ключ',
        timestamp: '2025-11-18T10:43:08.845Z',
        path: 'api/test-url',
      },
    },
  });
