import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

import {
  HttpResponse,
  HttpResponseSeverity,
} from '../types/http-reponse.types';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof HttpResponse) {
          return data;
        }

        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = response.statusCode;

        let severity = HttpResponseSeverity.INFO;
        if (
          statusCode >= HttpStatus.BAD_REQUEST &&
          statusCode < HttpStatus.INTERNAL_SERVER_ERROR
        ) {
          severity = HttpResponseSeverity.WARNING;
        } else if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
          severity = HttpResponseSeverity.ERROR;
        }

        return new HttpResponse(data, {
          code: statusCode,
          severity,
        });
      }),
    );
  }
}
