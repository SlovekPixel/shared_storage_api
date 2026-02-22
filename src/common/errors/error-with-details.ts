import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorWithDetails extends HttpException {
  public readonly details?: string;

  constructor(message: {
    details?: string;
    message: string;
    status?: HttpStatus;
  }) {
    super(message.message, (message.status = HttpStatus.INTERNAL_SERVER_ERROR));
    this.name = 'ErrorWithDetails';
    this.details = message.details;
  }
}
