import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IExceptionExecutorPort } from '~/filters/exceptions/application/ports/exception-executor.port';
import { ErrorWithDetailsException } from '~/filters/exceptions/application/executors/error-with-details.executor';
import { ZodValidateExceptionExecutor } from '~/filters/exceptions/application/executors/zod-validation-exception.executor';
import { HttpExceptionExecutor } from '~/filters/exceptions/application/executors/http-exception.executor';
import { ErrorExceptionExecutor } from '~/filters/exceptions/application/executors/error-exception.executor';
import { ExceptionResponseType } from '~/common/errors/exception-response.type';

@Catch()
export class CustomExceptionsFilter implements ExceptionFilter {
  private readonly exceptionExecutors: IExceptionExecutorPort[] = [
    new ErrorWithDetailsException(),
    new ZodValidateExceptionExecutor(),
    new HttpExceptionExecutor(),
    new ErrorExceptionExecutor(),
  ];

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    const path = httpAdapter.getRequestUrl(context.getRequest()) as string;
    const timestamp = new Date().toISOString();

    const executor = this.exceptionExecutors.find((e) =>
      e.canExecute(exception),
    );

    if (!executor) {
      const details: string | undefined =
        typeof exception === 'object' &&
        exception !== null &&
        'message' in exception
          ? String((exception as { message: unknown }).message)
          : undefined;

      const responseBody: ExceptionResponseType = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp,
        path,
        message: '[SHARED_STORAGE_API] Unknown Internal Server Error',
        details,
      };

      httpAdapter.reply(
        context.getResponse(),
        responseBody,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

      return;
    }

    const { message, details, statusCode } = executor.execute(exception);
    const responseBody: ExceptionResponseType = {
      statusCode,
      timestamp,
      path,
      message,
      details,
    };

    httpAdapter.reply(
      context.getResponse(),
      responseBody,
      responseBody.statusCode,
    );
  }
}
