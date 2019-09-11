import { Service } from '@tsed/di';
import { TypeORMService } from '@tsed/typeorm';
import { Connection, Not } from 'typeorm';
import { AfterRoutesInit } from '@tsed/common';
import { User } from '../../database/entities/user.model';
import { AuthenticationService } from '../../generic/authentication/authentication.service';
import { Conflict, InternalServerError } from 'ts-httpexceptions';
import { QueryParameters } from '../query-params.model';
import { Role } from '../../database/entities/role.model';
import { cloneDeep } from 'lodash';
import { Web3ProviderService } from '../../generic/web3-provider.service';
import { UserData } from '../../database/entities/user-data.model';
import { Contract } from '../../database/entities/contract.model';
// import { UserData } from '../../database/entities/user-data.model';
const tx = require('ethereumjs-tx').Transaction;

@Service()
export class UserService implements AfterRoutesInit {
  private readonly allIncludeValues = ['role', 'parentEntity'];
  public connection: Connection;
  private readonly ethQuantity = 50;
  constructor(
    private typeORMService: TypeORMService,
    private authenticationService: AuthenticationService,
    private web3Provider: Web3ProviderService
  ) {}

  $afterRoutesInit(): void | Promise<any> {
    this.connection = this.typeORMService.get();
    // this.setMasterAccountPass();
    return null;
  }

/*  private setMasterAccountPass() {
    this.connection.manager.findOne(User, {email: 'master.account@gmail.com'})
      .then((user: User) => {
        this.connection.manager.findOne(UserData, {userId: user.id}).then((userData: UserData) => {
          const account = this.web3Provider.connection.eth.accounts.create();
          if (user.blockChainAccount !== account.address) {
            user.blockChainAccount = account.address;
            this.connection.manager.save(user);
          }
          if (!userData) {
            const data = new UserData();
            data.userId = user.id;
            data.unlockData = account.privateKey;
            this.connection.manager.save(data);
          } else {
            userData.unlockData = account.privateKey;
            this.connection.manager.save(userData);
          }
          this.connection.manager.findOne(Contract, {name: 'manage_resources_migration'})
            .then((contract: Contract) => {
              const ethContract = new this.web3Provider.connection.eth.Contract(JSON.parse(contract.abi), contract.address);
              this.web3Provider.connection.eth.getTransactionCount(process.env.BCK_CONTRACT_MAIN_ACC, (_, txCount) => {
                const txConfig = {
                  nonce: this.web3Provider.connection.utils.toHex(txCount),
                  to: contract.address,
                  gasLimit: this.web3Provider.connection.utils.toHex(81000),
                  gasPrice: this.web3Provider.connection.utils.toHex(this.web3Provider.connection.utils.toWei('5', 'gwei')),
                  data: ethContract.methods.addUser(account.address).encodeABI()
                };
                const currentTransaction = new tx(txConfig);
                currentTransaction.sign(Buffer.from(process.env.BCK_CONTRACT_MAIN_ACC_SIGN,'hex'));

                const serializedTransaction = currentTransaction.serialize();
                const rawTransaction = '0x' + serializedTransaction.toString('hex');
                this.web3Provider.connection.eth.sendSignedTransaction(rawTransaction, (err, txHash) => {
                  console.log('err', err, 'txHash:', txHash);
                });
              });
            });
        });
      });
  }*/

  public getProfile(profileId: number, queryParams: QueryParameters): Promise<User> {
    const includeValue: string = queryParams ? queryParams.include : '';
    const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      const relationsArr = this.allIncludeValues.filter(el => includeList.indexOf(el) >= 0);
      return this.connection.manager.getRepository(User).findOne(profileId, {relations: relationsArr});
    }
    return this.connection.manager.findOne(User, {id: profileId});
  }

  public getUsers(profileId: number, queryParams: QueryParameters): Promise<Array<User>> {
    const includeValue: string = queryParams ? queryParams.include : '';
    const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      const relationsArr = this.allIncludeValues.filter(el => includeList.indexOf(el) >= 0);
      return this.connection.manager.getRepository(User).find({where: {id: Not(profileId)},relations: relationsArr});
    }
    return this.connection.manager.find(User, {id: Not(profileId)});
  }

  public getRoles(): Promise<Array<Role>> {
    return this.connection.manager.find(Role);
  }

  public alterParentEntity(userId: number, entityId: number) {
    return this.connection.manager.findOne(User, {id: userId})
      .then((user: User) => {
        const newUser = cloneDeep(user);
        newUser.parentEntityId = entityId;
        return this.connection.manager.save(newUser);
      });
  }

  public switchRole(userId: number, roleId: number) {
    return this.connection.manager.findOne(User, {id: userId})
      .then((user: User) => {
        const newUser = cloneDeep(user);
        newUser.roleId = roleId;
        return this.connection.manager.save(newUser);
      });
  }

  private getMasterAccount() {
    return  this.connection.manager.findOne(User, {email: 'master.account@gmail.com'})
      .then((user: User) => {
        return this.connection.manager.findOne(UserData, {userId: user.id}).then((userData: UserData) => {
          return {
            id: user.id,
            account: user.blockChainAccount,
            key: userData.unlockData
          };
        });
      });
  }

  public createUserW3() {
    this.web3Provider.connection.eth.getAccounts().then(acc => {
      console.log(acc);
    });
    this.web3Provider.connection.eth.getTransactionCount('0xd37a661aC767a23c170cCAD7babD7332669e8abD', (_, txCount) => {
      console.log(txCount);
    });

    this.web3Provider.connection.eth.getBalance('0xd37a661aC767a23c170cCAD7babD7332669e8abD', (_, wei) => {
      console.log(this.web3Provider.connection.utils.fromWei(wei, 'ether'));
    });
    const web3 = this.web3Provider.connection;
    this.connection.manager.findOne(Contract, {name: 'manage_products_migration'})
      .then((contract: Contract) => {
        const ethContract = new web3.eth.Contract(JSON.parse(contract.abi), contract.address);
        web3.eth.getTransactionCount('0x8373ba218cB895E8a8b9a6851C8B2bb835B82D2E', (_, txCount) => {
          console.log(txCount);
          const txConfig = {
            nonce: web3.utils.toHex(txCount),
            to: contract.address,
            gasLimit: web3.utils.toHex(41000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('5', 'gwei')),
            // tslint:disable-next-line:max-line-length
            data: ethContract.methods.addProduct(1234, [123, 1321, 31231], Date.now()).encodeABI()
          };
          const currentTransaction = new tx(txConfig);
          currentTransaction.sign(Buffer.from('d0edef994aadf7e9ae48e374366e47173a3cfdae2b433a9e879d5f0e1c0bd0dc','hex'));

          const serializedTransaction = currentTransaction.serialize();
          const rawTransaction = '0x' + serializedTransaction.toString('hex');
          // tslint:disable-next-line:no-shadowed-variable
          web3.eth.sendSignedTransaction(rawTransaction, (err, txHash) => {
            console.log('err', err, 'txHash:', txHash);
          });
        });
      });
    return [];
  }

  public createUser(user: User): Promise<User> {
    const saltedPassword = this.authenticationService.sha512(user.password, this.authenticationService.getSalt());
    user.password = saltedPassword.passwordHash;
    user.salt = saltedPassword.salt;
    user.roleId = 1;
    const account = this.web3Provider.connection.eth.accounts.create();
    user.blockChainAccount = account.address;
    return this.connection.manager.save(user).then((createdUser: User) => {
      delete createdUser.password;
      delete createdUser.salt;
      const data = new UserData();
      data.userId = user.id;
      data.unlockData = account.privateKey.substring(2);
      return this.connection.manager.save(data).then(() => {
        return this.getMasterAccount().then((acc: {id: number, account: string, key: string}) => {
          const web3 = this.web3Provider.connection;
          web3.eth.getTransactionCount(acc.account, (_, txCount) => {
            const txConfig = {
              nonce: web3.utils.toHex(txCount),
              to: account.address,
              value: web3.utils.toHex(web3.utils.toWei(`${this.ethQuantity}`, 'ether')),
              gasLimit: web3.utils.toHex(21000),
              gasPrice: web3.utils.toHex(web3.utils.toWei('5', 'gwei'))
            };
            const currentTransaction = new tx(txConfig);
            currentTransaction.sign(Buffer.from(acc.key,'hex'));

            const serializedTransaction = currentTransaction.serialize();
            const rawTransaction = '0x' + serializedTransaction.toString('hex');
            // tslint:disable-next-line:no-shadowed-variable
            web3.eth.sendSignedTransaction(rawTransaction, (_, txHash) => {
              console.log('txHash:', txHash);
            });
            // tslint:disable-next-line:no-shadowed-variable
            this.web3Provider.connection.eth.getBalance(account.address, (_, wei) => {
              console.log(
                'User',
                account.address,
                ' ether balance: ',
                this.web3Provider.connection.utils.fromWei(wei, 'ether')
              );
            });
          });
          return this.connection.manager.findOne(Contract, {name: 'manage_resources_migration'})
            .then((contract: Contract) => {
              const ethContract = new web3.eth.Contract(JSON.parse(contract.abi), contract.address);
              web3.eth.getTransactionCount(process.env.BCK_CONTRACT_MAIN_ACC, (_, txCount) => {
                const txConfig = {
                  nonce: web3.utils.toHex(txCount),
                  to: contract.address,
                  gasLimit: web3.utils.toHex(81000),
                  gasPrice: web3.utils.toHex(web3.utils.toWei('5', 'gwei')),
                  data: ethContract.methods.addUser(account.address).encodeABI()
                };
                const currentTransaction = new tx(txConfig);
                currentTransaction.sign(Buffer.from(process.env.BCK_CONTRACT_MAIN_ACC_SIGN,'hex'));

                const serializedTransaction = currentTransaction.serialize();
                const rawTransaction = '0x' + serializedTransaction.toString('hex');
                web3.eth.sendSignedTransaction(rawTransaction, (err, txHash) => {
                  console.log('err', err, 'txHash:', txHash);
                });
              });
              return createdUser;
            });
        });
      });
    }).catch(err => {
      console.log(err);
      if (err.code === 'ER_DUP_ENTRY') {
        throw new Conflict(err.message);
      }
      throw new InternalServerError(err.message);
    });
  }
}
