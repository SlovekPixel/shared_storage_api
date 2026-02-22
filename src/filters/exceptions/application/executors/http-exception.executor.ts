import { IExceptionExecutorPort } from '~/filters/exceptions/application/ports/exception-executor.port';
import { HttpException } from '@nestjs/common';
import { ExceptionResponseType } from '~/common/errors/exception-response.type';
import { isString } from 'lodash-es';

export class HttpExceptionExecutor implements IExceptionExecutorPort {
  canExecute(exception: unknown): boolean {
    return exception instanceof HttpException;
  }

  execute(
    exception: HttpException,
  ): Omit<ExceptionResponseType, 'path' | 'timestamp'> {
    const response = exception.getResponse();
    const statusCode = exception.getStatus();

    if (isString(response))
      return {
        statusCode,
        message: response,
      };

    const message: string | string[] =
      'message' in response &&
      (isString(response.message) || Array.isArray(response.message))
        ? response.message
        : '[SHARED_STORAGE_API] HttpException';

    console.error('[SHARED_STORAGE_API] HttpException:', message);

    return {
      statusCode,
      message,
      details: 'details' in response ? String(response.details) : undefined,
    };
  }
}
