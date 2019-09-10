import { Service } from '@tsed/di';
const Web3 = require('web3');

@Service()
export class Web3ProviderService {
  private web3 = new Web3(`${process.env.BCK_SCHEMA}://${process.env.BCK_HOST}:${process.env.BCK_PORT}`);

  public get connection() {
    return this.web3;
  }
}
