import { IExceptionExecutorPort } from '~/filters/exceptions/application/ports/exception-executor.port';
import { ZodValidationException } from 'nestjs-zod';
import { ExceptionResponseType } from '~/common/errors/exception-response.type';
import { type ZodError } from 'zod';
import { HttpStatus } from '@nestjs/common';

export class ZodValidateExceptionExecutor implements IExceptionExecutorPort {
  canExecute(exception: unknown): boolean {
    return exception instanceof ZodValidationException;
  }

  execute(
    exception: ZodValidationException,
  ): Omit<ExceptionResponseType, 'path' | 'timestamp'> {
    const error = exception.getZodError() as ZodError;

    const message = error.issues.map(
      (item) => `${item.path.join(', ')}: ${item.message}`,
    );

    console.error(
      '[SHARED_STORAGE_API] ZodValidateException:',
      message.join('; '),
    );

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message,
    };
  }
}
