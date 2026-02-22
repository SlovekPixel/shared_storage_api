import { ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export const InternalServerErrorSwaggerResponse = (data: {
  details?: string;
  message: string;
}) =>
  ApiInternalServerErrorResponse({
    description: 'Внутренняя ошибка сервера при получении данных',
    schema: {
      type: 'object',
      example: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: '2025-09-15T11:25:12.123Z',
        path: 'api/test-url',
        message: data.message,
        details: data.details,
      },
    },
  });
