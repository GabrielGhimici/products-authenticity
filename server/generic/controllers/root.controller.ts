import { Controller, Get, Response } from '@tsed/common';
import * as Path from 'path';

@Controller('')
export class RootController {
  @Get('*')
  public loadIndex(@Response() response) {
    response.sendFile(Path.resolve(__dirname, '../../products-authenticity/index.html'));
  }
}
