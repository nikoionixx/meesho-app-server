import { Controller, Get } from '@nestjs/common';

@Controller('sample')
export class TestController {
  @Get()
  getSampleData(): string {
    return 'Working Fine';
  }
}
