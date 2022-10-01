export class ErrorResponse {
  constructor(code: string, message: string, statusCode: number) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = [message];
  }
  statusCode: number;
  code: string;
  message: string[] = [];
}
