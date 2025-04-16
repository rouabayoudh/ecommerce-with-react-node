import { HttpStatus } from '@nestjs/common';

export type THttpResponse = {
  severity: HttpResponseSeverity;
  code: number;
  data?: any;
  count?: number;
  messages?: THttpResponseMessage[];
  //pagination?: PaginationResponse;
};

export type THttpResponseMessage = {
  shortDescription: string;
  longDescription: string;
  severity: HttpResponseSeverity;
};

export enum HttpResponseSeverity {
  INFO = 0,
  WARNING = 1,
  ERROR = 2,
}

export type PaginationResponse = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export class HttpResponse implements THttpResponse {
  severity: HttpResponseSeverity;

  code: number;

  data?: any;

  messages: THttpResponseMessage[] = [];

  pagination?: PaginationResponse;

  count?: number;

  constructor(
    data: any,
    {
      code = HttpStatus.OK,
      severity = HttpResponseSeverity.INFO,
      count,
    }: {
      code?: number;
      severity?: HttpResponseSeverity;
      count?: number;
    },
    pagination?: PaginationResponse,
  ) {
    this.data = data;
    this.code = code;
    this.severity = severity;
    this.pagination = pagination;
    this.count = count;
  }

  addMessage(
    shortDescription: string,
    longDescription: string,
    severity: HttpResponseSeverity = HttpResponseSeverity.INFO,
  ) {
    this.messages.push({ shortDescription, longDescription, severity });
  }
}

export class SuccessResponse extends HttpResponse {
  constructor(
    data: any,
    successShortDescription?: string,
    successLongDescription?: string,
    {
      code = HttpStatus.OK,
      severity = HttpResponseSeverity.INFO,
    }: {
      code?: number;
      severity?: HttpResponseSeverity;
    } = {},
    pagination?: PaginationResponse,
  ) {
    super(data, { code, severity }, pagination);
    this.addMessage(
      successShortDescription,
      successLongDescription,
      HttpResponseSeverity.INFO,
    );
  }
}

export class ErrorResponse extends HttpResponse {
  constructor(
    data: any,
    errorShortDescription: string = 'An error occurred',
    errorLongDescription: string = 'Please try again later, if the problem persists contact support',
    {
      code = HttpStatus.INTERNAL_SERVER_ERROR,
      severity = HttpResponseSeverity.ERROR,
    }: {
      code?: number;
      severity?: HttpResponseSeverity;
    } = {},
    pagination?: PaginationResponse,
  ) {
    super(data, { code, severity }, pagination);
    this.addMessage(
      errorShortDescription,
      errorLongDescription,
      HttpResponseSeverity.ERROR,
    );
  }
}
