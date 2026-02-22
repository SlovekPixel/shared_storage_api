import { IExceptionExecutorPort } from '~/filters/exceptions/application/ports/exception-executor.port';
import { ErrorWithDetails } from '~/common/errors/error-with-details';
import { ExceptionResponseType } from '~/common/errors/exception-response.type';
import { HttpStatus } from '@nestjs/common';

export class ErrorWithDetailsException implements IExceptionExecutorPort {
  canExecute(exception: unknown): boolean {
    return exception instanceof ErrorWithDetails;
  }

  execute(
    exception: ErrorWithDetails,
  ): Omit<ExceptionResponseType, 'path' | 'timestamp'> {
    const { message, details } = exception;

    console.error('[SHARED_STORAGE_API] ErrorWithDetails', details);

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      details,
    };
  }
}
