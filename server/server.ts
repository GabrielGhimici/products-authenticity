import { ServerLoader, ServerSettings } from '@tsed/common';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as Path from 'path';

@ServerSettings({
  port: 3000,
  rootDir: Path.resolve(__dirname),
  mount: {
    '/api': '${rootDir}/api/*.js',
    '/': '${rootDir}/generic/*.js'
  },
  logger: {
    logRequest: true
  }
})
export class Server extends ServerLoader {
  public $onMountingMiddlewares(): void|Promise<any> {
    this
      .use(cookieParser())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
    return null;
  }
}
