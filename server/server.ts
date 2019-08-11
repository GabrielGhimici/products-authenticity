import { ServerLoader, ServerSettings } from '@tsed/common';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as Path from 'path';
import * as crypto from 'crypto';
import * as Express from 'express';
import { config } from 'dotenv';

config();

@ServerSettings({
  httpPort: 3000,
  rootDir: Path.resolve(__dirname),
  mount: {
    '/api': '${rootDir}/api/*.js',
    '/': '${rootDir}/generic/*.js'
  },
  typeorm: [{
    name: 'default',
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    entities: [
      `${__dirname}/database/entities/*{.ts,.js}`
    ]
  }],
  logger: {
    logRequest: true
  }
})
export class Server extends ServerLoader {
  getSalt(length: number = 5) {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length)
      .toUpperCase();
  }

  sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
      salt,
      passwordHash: value
    };
  }

  public $onMountingMiddlewares(): void | Promise<any> {
    this
      .use(cookieParser())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
    this.use(Express.static(`${__dirname}/../products-authenticity`));
    console.log(this.sha512('godAccountPass', this.getSalt(7)));
    return null;
  }
}
