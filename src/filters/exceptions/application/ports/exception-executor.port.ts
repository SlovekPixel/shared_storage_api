import { ExceptionResponseType } from '~/common/errors/exception-response.type';

export interface IExceptionExecutorPort {
  canExecute(exception: unknown): boolean;
  execute(
    exception: unknown,
  ): Omit<ExceptionResponseType, 'path' | 'timestamp'>;
}
