import { IExceptionExecutorPort } from '~/filters/exceptions/application/ports/exception-executor.port';
import { ExceptionResponseType } from '~/common/errors/exception-response.type';
import { HttpStatus } from '@nestjs/common';

export class ErrorExceptionExecutor implements IExceptionExecutorPort {
  canExecute(exception: unknown): boolean {
    return exception instanceof Error;
  }

  execute(exception: Error): Omit<ExceptionResponseType, 'path' | 'timestamp'> {
    console.error('[SHARED_STORAGE_API] ErrorException: ', exception);

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '[SHARED_STORAGE_API] Error',
      details: exception.message,
    };
  }
}
