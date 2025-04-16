import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import {
  ErrorResponse,
  HttpResponseSeverity,
} from '../types/http-reponse.types';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    if (!(exception instanceof HttpException)) {
      Logger.error(exception.message, exception.stack, 'HttpExceptionFilter');
      this.catch(
        new InternalServerErrorException(
          'Try again later, if the problem persists contact technical support',
        ),
        host,
      );
      return;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const responseMessage = exception.getResponse();

    const severity = HttpResponseSeverity.ERROR;
    const shortDescription =
      responseMessage['error'] || 'Internal Server Error';
    const longDescription = responseMessage['message'] || 'An error occurred';

    const httpResponse = new ErrorResponse(
      null,
      shortDescription,
      longDescription,
      {
        code: status,
        severity,
      },
    );

    response.status(status).json(httpResponse);
  }
}
