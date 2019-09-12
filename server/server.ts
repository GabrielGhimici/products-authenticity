import { ServerLoader, ServerSettings } from '@tsed/common';
import { config } from 'dotenv';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as Path from 'path';
import * as Express from 'express';
import * as session from 'express-session';
const fs = require('fs');

config();

@ServerSettings({
  httpPort: process.env.PORT || 3000,
  rootDir: Path.resolve(__dirname),
  mount: {
    '/api': '${rootDir}/api/controllers/*.js',
    '/': '${rootDir}/generic/controllers/*.js'
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
    ],
    logging: true
  }],
  logger: {
    logRequest: true
  }
})
export class Server extends ServerLoader {
  public $onMountingMiddlewares(): void | Promise<any> {
    this
      .use(cookieParser())
      .use(bodyParser.json({
        limit: '20mb',
        type: 'application/json'
      }))
      .use(bodyParser.urlencoded({
        extended: true
      }))
      .use(session({
        secret: 'S3CR37K3Y',
        saveUninitialized: true,
        resave: false,
        cookie: {
          expires: new Date(Number(new Date())+24*60*60*1000),
          secure: 'auto',
        }
      }));
    this.use(Express.static(`${__dirname}/../products-authenticity`));

    if (!fs.existsSync(`${__dirname}/../qr-codes`)) {
      fs.mkdirSync(`${__dirname}/../qr-codes`);
      console.log('CREATED: ', `${__dirname}/../qr-codes`);
    }
    return null;
  }
}
