import { Service } from '@tsed/di';
import { Web3ProviderService } from './web3-provider.service';
import { User } from '../database/entities/user.model';
import { TypeORMService } from '@tsed/typeorm';
import { Connection } from 'typeorm';
import { Product } from '../database/entities/product.model';
import { UserData } from '../database/entities/user-data.model';
import { Contract } from '../database/entities/contract.model';
import { ProductionStep, StepStatusTypes } from '../database/entities/production-step.model';

const tx = require('ethereumjs-tx').Transaction;

@Service()
export class SimulateProductionService {
  private connection: Connection;

  constructor(
    private web3Provider: Web3ProviderService,
    private typeORMService: TypeORMService,
  ) {
  }

  $afterRoutesInit(): void | Promise<any> {
    this.connection = this.typeORMService.get();
    return null;
  }

  runOk(user: User, id: number) {
    console.log(this.web3Provider, user, id);
    this.connection.manager.findOne(Product, {
      where: {id}, relations: [
        'analytics',
        'owner',
        'productType',
        'productType.defaultProductionSteps',
        'productType.products',
        'productionSteps',
        'productionSteps.defaultProductionStep'
      ]
    }).then((product: Product) => {
      this.connection.manager.findOne(UserData, {userId: user.id}).then((userData: UserData) => {
        this.connection.manager.findOne(Contract, {name: 'manage_products_migration'})
          .then((contract: Contract) => {
            const ethContract = new this.web3Provider.connection.eth.Contract(JSON.parse(contract.abi), contract.address);
            this.web3Provider.connection.eth.getTransactionCount(user.blockChainAccount, (_, txCount) => {
              const txConfig = {
                nonce: this.web3Provider.connection.utils.toHex(txCount),
                to: contract.address,
                gasLimit: this.web3Provider.connection.utils.toHex(181000),
                gasPrice: this.web3Provider.connection.utils.toHex(this.web3Provider.connection.utils.toWei('5', 'gwei')),
                data: ethContract.methods.startProducing(product.id).encodeABI()
              };
              const currentTransaction = new tx(txConfig);
              currentTransaction.sign(Buffer.from(userData.unlockData, 'hex'));

              const serializedTransaction = currentTransaction.serialize();
              const rawTransaction = '0x' + serializedTransaction.toString('hex');
              this.web3Provider.connection.eth.sendSignedTransaction(rawTransaction, (err, txHash) => {
                console.log('err', err, 'Start production:', txHash);
                this.runTransactions(
                  product.id,
                  0,
                  product.productionSteps,
                  user.blockChainAccount,
                  userData.unlockData,
                  ethContract,
                  contract.address
                );
              });
            });
          });
      });
    });
    return {ok: true};
  }

  // tslint:disable-next-line:max-line-length
  private runTransactions(productId: number, stepIndex: number, steps: Array<ProductionStep>, userAccount: string, userSign: string, contract, contractAddress) {
    if (stepIndex === steps.length) {
      console.log('FINISHED');
      return true;
    } else {
      const stepId = steps[stepIndex].id;
      return this.web3Provider.connection.eth.getTransactionCount(userAccount).then((txCountSS) => {
        const txConfigSS = {
          nonce: this.web3Provider.connection.utils.toHex(txCountSS),
          to: contractAddress,
          gasLimit: this.web3Provider.connection.utils.toHex(181000),
          gasPrice: this.web3Provider.connection.utils.toHex(this.web3Provider.connection.utils.toWei('5', 'gwei')),
          data: contract.methods.updateStepStartStatus(productId, stepId).encodeABI()
        };
        const currentTransactionSS = new tx(txConfigSS);
        currentTransactionSS.sign(Buffer.from(userSign, 'hex'));

        const serializedTransactionSS = currentTransactionSS.serialize();
        const rawTransactionSS = '0x' + serializedTransactionSS.toString('hex');
        return this.web3Provider.connection.eth.sendSignedTransaction(rawTransactionSS).then((sstxHash) => {
          console.log('Start step production:', sstxHash.transactionHash);
          return this.web3Provider.connection.eth.getTransactionCount(userAccount).then((txCount) => {
            const txConfig = {
              nonce: this.web3Provider.connection.utils.toHex(txCount),
              to: contractAddress,
              gasLimit: this.web3Provider.connection.utils.toHex(181000),
              gasPrice: this.web3Provider.connection.utils.toHex(this.web3Provider.connection.utils.toWei('5', 'gwei')),
              data: contract.methods.addStepDetails(productId, stepId, 'Waiting goods', 2, Date.now()).encodeABI()
            };
            const currentTransaction = new tx(txConfig);
            currentTransaction.sign(Buffer.from(userSign, 'hex'));

            const serializedTransaction = currentTransaction.serialize();
            const rawTransaction = '0x' + serializedTransaction.toString('hex');
            return this.web3Provider.connection.eth.sendSignedTransaction(rawTransaction).then((txHash) => {
              console.log('AddMessage:', stepId, '-', txHash.transactionHash);
              return this.web3Provider.connection.eth.getTransactionCount(userAccount).then((txCount1) => {
                const txConfig1 = {
                  nonce: this.web3Provider.connection.utils.toHex(txCount1),
                  to: contractAddress,
                  gasLimit: this.web3Provider.connection.utils.toHex(181000),
                  gasPrice: this.web3Provider.connection.utils.toHex(this.web3Provider.connection.utils.toWei('5', 'gwei')),
                  data: contract.methods.addStepDetails(productId, stepId, 'Received goods', 2, Date.now()).encodeABI()
                };
                const currentTransaction1 = new tx(txConfig1);
                currentTransaction1.sign(Buffer.from(userSign, 'hex'));

                const serializedTransaction1 = currentTransaction1.serialize();
                const rawTransaction1 = '0x' + serializedTransaction1.toString('hex');
                return this.web3Provider.connection.eth.sendSignedTransaction(rawTransaction1).then((txHash1) => {
                  console.log('AddMessage:', stepId, '-', txHash1.transactionHash);
                  const step = steps[stepIndex];
                  step.status = StepStatusTypes.Finished;
                  return this.connection.manager.save(step).then(() => {
                    return this.runTransactions(productId, stepIndex + 1, steps, userAccount, userSign, contract, contractAddress);
                  });
                });
              });
            });
          });
        });
      });
    }
  }

  runFail(user: User, id: number) {
    console.log(this.web3Provider, user, id);
    this.connection.manager.findOne(Product, {
      where: {id}, relations: [
        'analytics',
        'owner',
        'productType',
        'productType.defaultProductionSteps',
        'productType.products',
        'productionSteps',
        'productionSteps.defaultProductionStep'
      ]
    }).then((product: Product) => {
      this.connection.manager.findOne(UserData, {userId: user.id}).then((userData: UserData) => {
        this.connection.manager.findOne(Contract, {name: 'manage_products_migration'})
          .then((contract: Contract) => {
            const ethContract = new this.web3Provider.connection.eth.Contract(JSON.parse(contract.abi), contract.address);
            this.web3Provider.connection.eth.getTransactionCount(user.blockChainAccount, (_, txCount) => {
              const txConfig = {
                nonce: this.web3Provider.connection.utils.toHex(txCount),
                to: contract.address,
                gasLimit: this.web3Provider.connection.utils.toHex(181000),
                gasPrice: this.web3Provider.connection.utils.toHex(this.web3Provider.connection.utils.toWei('5', 'gwei')),
                data: ethContract.methods.startProducing(product.id).encodeABI()
              };
              const currentTransaction = new tx(txConfig);
              currentTransaction.sign(Buffer.from(userData.unlockData, 'hex'));

              const serializedTransaction = currentTransaction.serialize();
              const rawTransaction = '0x' + serializedTransaction.toString('hex');
              this.web3Provider.connection.eth.sendSignedTransaction(rawTransaction, (err, txHash) => {
                console.log('err', err, 'Start production:', txHash);
                this.runTransactionsFail(
                  product.id,
                  0,
                  product.productionSteps,
                  user.blockChainAccount,
                  userData.unlockData,
                  ethContract,
                  contract.address
                );
              });
            });
          });
      });
    });
    return {ok: true};
  }

  // tslint:disable-next-line:max-line-length
  private runTransactionsFail(productId: number, stepIndex: number, steps: Array<ProductionStep>, userAccount: string, userSign: string, contract, contractAddress) {
    if (stepIndex === steps.length) {
      console.log('FINISHED');
      return true;
    } else {
      const stepId = steps[stepIndex].id;
      return this.web3Provider.connection.eth.getTransactionCount(userAccount).then((txCountSS) => {
        const txConfigSS = {
          nonce: this.web3Provider.connection.utils.toHex(txCountSS),
          to: contractAddress,
          gasLimit: this.web3Provider.connection.utils.toHex(181000),
          gasPrice: this.web3Provider.connection.utils.toHex(this.web3Provider.connection.utils.toWei('5', 'gwei')),
          data: contract.methods.updateStepStartStatus(productId, stepId).encodeABI()
        };
        const currentTransactionSS = new tx(txConfigSS);
        currentTransactionSS.sign(Buffer.from(userSign, 'hex'));

        const serializedTransactionSS = currentTransactionSS.serialize();
        const rawTransactionSS = '0x' + serializedTransactionSS.toString('hex');
        return this.web3Provider.connection.eth.sendSignedTransaction(rawTransactionSS).then((sstxHash) => {
          console.log('Start step production:', sstxHash.transactionHash);
          return this.web3Provider.connection.eth.getTransactionCount(userAccount).then((txCount) => {
            const org = stepIndex === 0 ? 3 : 2;
            const txConfig = {
              nonce: this.web3Provider.connection.utils.toHex(txCount),
              to: contractAddress,
              gasLimit: this.web3Provider.connection.utils.toHex(181000),
              gasPrice: this.web3Provider.connection.utils.toHex(this.web3Provider.connection.utils.toWei('5', 'gwei')),
              data: contract.methods.addStepDetails(productId, stepId, 'Waiting goods', org, Date.now()).encodeABI()
            };
            const currentTransaction = new tx(txConfig);
            currentTransaction.sign(Buffer.from(userSign, 'hex'));

            const serializedTransaction = currentTransaction.serialize();
            const rawTransaction = '0x' + serializedTransaction.toString('hex');
            return this.web3Provider.connection.eth.sendSignedTransaction(rawTransaction).then((txHash) => {
              console.log('AddMessage:', stepId, '-', txHash.transactionHash);
              return this.web3Provider.connection.eth.getTransactionCount(userAccount).then((txCount1) => {
                const txConfig1 = {
                  nonce: this.web3Provider.connection.utils.toHex(txCount1),
                  to: contractAddress,
                  gasLimit: this.web3Provider.connection.utils.toHex(181000),
                  gasPrice: this.web3Provider.connection.utils.toHex(this.web3Provider.connection.utils.toWei('5', 'gwei')),
                  data: contract.methods.addStepDetails(productId, stepId, 'Received goods', 2, Date.now()).encodeABI()
                };
                const currentTransaction1 = new tx(txConfig1);
                currentTransaction1.sign(Buffer.from(userSign, 'hex'));

                const serializedTransaction1 = currentTransaction1.serialize();
                const rawTransaction1 = '0x' + serializedTransaction1.toString('hex');
                return this.web3Provider.connection.eth.sendSignedTransaction(rawTransaction1).then((txHash1) => {
                  console.log('AddMessage:', stepId, '-', txHash1.transactionHash);
                  const step = steps[stepIndex];
                  step.status = StepStatusTypes.Finished;
                  return this.connection.manager.save(step).then(() => {
                    return this.runTransactions(productId, stepIndex + 1, steps, userAccount, userSign, contract, contractAddress);
                  });
                });
              });
            });
          });
        });
      });
    }
  }
}
