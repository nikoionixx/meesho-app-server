export class SuccessResponse {
  constructor(message: string, data: any) {
    this.message = message;
    this.data = data;
  }
  code = 'SUCCESS_RESPONSE';
  message: string;
  data: any;
}
