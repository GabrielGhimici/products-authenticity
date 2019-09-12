import { Service } from '@tsed/di';
import { AfterRoutesInit } from '@tsed/common';
import { TypeORMService } from '@tsed/typeorm';
import { Connection } from 'typeorm';
import { QueryParameters } from '../query-params.model';
import { Product } from '../../database/entities/product.model';
import { Forbidden, InternalServerError, NotFound, Unauthorized } from 'ts-httpexceptions';
import { User } from '../../database/entities/user.model';
import { ProductType } from '../../database/entities/product-type.model';
import {
  BlockchainProduct,
  BlockchainProductionDetail,
  BlockchainStates,
  BlockchainStep,
  BlockchainStepStatusTypes,
  ProductData
} from './product.data';
import { DefaultProductionStep } from '../../database/entities/default-production-step.model';
import { ProductionStep } from '../../database/entities/production-step.model';
import * as Path from 'path';
import { Web3ProviderService } from '../../generic/web3-provider.service';
import { Contract } from '../../database/entities/contract.model';
import * as moment from 'moment';

const uuidv4 = require('uuid/v4');
const fs = require('fs');
const QRCode = require('qrcode');
const tx = require('ethereumjs-tx').Transaction;

@Service()
export class ProductService implements AfterRoutesInit {
  private readonly allIncludeValues = [
    'analytics',
    'owner',
    'productType',
    'productType.defaultProductionSteps',
    'productType.products',
    'productionSteps',
    'productionSteps.defaultProductionStep'
  ];
  public connection: Connection;

  constructor(
    private typeORMService: TypeORMService,
    private web3Provider: Web3ProviderService
  ) {}

  $afterRoutesInit(): void | Promise<any> {
    this.connection = this.typeORMService.get();
    return null;
  }

  private enrichProduct(product: Product) {
    const web3 = this.web3Provider.connection;
    return this.connection.manager.findOne(Contract, {name: 'manage_products_migration'})
      .then((contract: Contract) => {
        const ethContract = new web3.eth.Contract(JSON.parse(contract.abi), contract.address);
        if (product) {
          const result = ethContract.methods.getProduct(product.id).call();
          return result.then((value) => {
            const productId = Number(value.id);
            const valid = value.valid;
            const productState = Number(value.state);
            if (productId === 0) {
              product.blockchainStatus = null;
            } else {
              product.blockchainStatus = new BlockchainProduct(productId, valid, BlockchainStates.fromValue(productState));
            }
            if (product.productionSteps && product.productionSteps.length) {
              const bckStepsCalls = product.productionSteps.map((step: ProductionStep) => {
                return ethContract.methods.getStep(product.id, step.id).call();
              });
              return Promise.all(bckStepsCalls).then((values: Array<any>) => {
                product.productionSteps = product.productionSteps.map((prodStep: ProductionStep) => {
                  prodStep.blockchainStatus = null;
                  return prodStep;
                });
                values.forEach(stepValue => {
                  const stepId = Number(stepValue.id);
                  const stepStatus = Number(stepValue.status);
                  const detailMessages = stepValue.messages;
                  const detailAdditionalIds = stepValue.additionalId;
                  const detailDates = stepValue.dates;
                  const details: Array<BlockchainProductionDetail> = [];
                  detailMessages.forEach((msg, index) => {
                    const detailDate = detailDates[index]
                      ? new Date(moment.utc(Number(detailDates[index])).toISOString())
                      : new Date(moment.utc().toISOString());
                    const id = detailAdditionalIds[index] && Number(detailAdditionalIds[index]) !== 0
                      ? Number(detailAdditionalIds[index])
                      : null;
                    details.push(new BlockchainProductionDetail(msg, detailDate, id));
                  });
                  const stepInfo = new BlockchainStep(
                    stepId,
                    BlockchainStepStatusTypes.fromValue(stepStatus),
                    details
                  );
                  product.productionSteps.forEach((prodStep: ProductionStep, index: number) => {
                    if (prodStep.id === stepId) {
                      product.productionSteps[index].blockchainStatus = stepInfo;
                    }
                  });
                });
                console.log(product);
                return product;
              });
            } else {
              return product;
            }
          }).catch((err) => {
            throw new InternalServerError(err);
          });
        } else {
          return product;
        }
      });
  }

  public getProductByIdentifier(identifier: string, queryParams: QueryParameters) {
    const includeValue: string = queryParams ? queryParams.include : '';
    const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      const relationsArr = this.allIncludeValues.filter(el => includeList.indexOf(el) >= 0);
      return this.connection.manager.findOne(Product, {publicIdentifier: identifier}, {relations: relationsArr})
        .then((result: Product) => {
          if (!result) {
            throw new NotFound(`Unable to find product with identifier ${identifier}`);
          }
          return this.enrichProduct(result);
        });
    }
    return this.connection.manager.findOne(Product, {publicIdentifier: identifier})
      .then((result: Product) => {
        if (!result) {
          throw new NotFound(`Unable to find product with identifier ${identifier}`);
        }
        return this.enrichProduct(result);
      });
  }

  public getProductById(id: number, queryParams: QueryParameters): Promise<Product> {
    const includeValue: string = queryParams ? queryParams.include : '';
    const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      const relationsArr = this.allIncludeValues.filter(el => includeList.indexOf(el) >= 0);
      return this.connection.manager.findOne(Product, {id}, {relations: relationsArr})
        .then((result: Product) => {
          if (!result) {
            throw new NotFound(`Unable to find product with identifier ${id}`);
          }
          return this.enrichProduct(result);
        });
    }
    return this.connection.manager.findOne(Product, {id})
      .then((result: Product) => {
        if (!result) {
          throw new NotFound(`Unable to find product with identifier ${id}`);
        }
        return this.enrichProduct(result);
      });
  }

  getProductTypes(queryParams: QueryParameters) {
    const includeValue: string = queryParams ? queryParams.include : '';
    const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (includeList.length !== 0) {
      const relationsArr = this.allIncludeValues.filter(el => includeList.indexOf(el) >= 0);
      return this.connection.manager.find(ProductType, {relations: relationsArr});
    }
    return this.connection.manager.find(ProductType);
  }

  public getProductByOrganization(user: User, queryParams: QueryParameters) {
    const includeValue: string = queryParams ? queryParams.include : '';
    const includeList: Array<string> = includeValue ? includeValue.split(',').map(el => el.replace(/\s+/g, '')) : [];
    if (!user) {
      throw new Unauthorized('Please login to see this feature');
    }
    if (user.roleId === 1) {
      throw new Forbidden('You don\'t have permission to see this list!');
    }
    if (!user.parentEntityId && user.roleId === 4) {
      if (includeList.length !== 0) {
        const relationsArr = this.allIncludeValues.filter(el => includeList.indexOf(el) >= 0);
        return this.connection.manager.find(Product, {relations: relationsArr, order: {id: 'DESC'}});
      }
      return this.connection.manager.find(Product, {order: {id: 'DESC'}});
    }
    if (!user.parentEntityId && user.roleId !== 4) {
      return [];
    }
    if (includeList.length !== 0) {
      const relationsArr = this.allIncludeValues.filter(el => includeList.indexOf(el) >= 0);
      return this.connection.manager.find(Product, {where: {ownerId: user.parentEntityId}, relations: relationsArr});
    }
    return this.connection.manager.find(Product, {ownerId: user.parentEntityId});
  }

  public saveProduct(userId: number, product: ProductData) {
    const publicIdentifier = uuidv4();
    const actualProduct = new Product();
    actualProduct.name = product.name;
    actualProduct.ownerId = product.parentEntity;
    actualProduct.productTypeId = product.productType;
    actualProduct.validityTermUnit = product.validityTermUnit;
    actualProduct.validityTermQuantity = product.validityTermQuantity;
    actualProduct.publicIdentifier = publicIdentifier;
    actualProduct.productionDate = new Date();
    return this.connection.manager.save(actualProduct).then((savedProduct: Product) => {
      return this.connection.manager.find(DefaultProductionStep, {productTypeId: savedProduct.productTypeId})
        .then((steps: Array<DefaultProductionStep>) => {
          const saveSteps = steps.map((step: DefaultProductionStep) => {
            const stepToSave = new ProductionStep();
            stepToSave.defaultProductionStepId = step.id;
            stepToSave.productId = savedProduct.id;
            return this.connection.manager.save(stepToSave);
          });
          return Promise.all(saveSteps).then((savedSteps: Array<ProductionStep>) => {
            const qrCodesDir = Path.resolve(__dirname, '..', '..', '..', 'qr-codes');
            if (!fs.existsSync(`${qrCodesDir}/${savedProduct.id}`)) {
              fs.mkdirSync(`${qrCodesDir}/${savedProduct.id}`);
            }
            QRCode.toFile(`${qrCodesDir}/${savedProduct.id}/identifier.png`, savedProduct.publicIdentifier, {type: 'png'}, (err) => {
              if (err) {
                console.log('IDENTIFIER', err);
              }
            });
            QRCode.toFile(`${qrCodesDir}/${savedProduct.id}/production.png`, savedProduct.id.toString(), {type: 'png'}, (err) => {
              if (err) {
                console.log('PRODUCTION', err);
              }
            });
            const web3 = this.web3Provider.connection;
            return this.connection.manager.findOne(Contract, {name: 'manage_products_migration'})
              .then((contract: Contract) => {
                const ethContract = new web3.eth.Contract(JSON.parse(contract.abi), contract.address);
                const ids = savedSteps.map((step: ProductionStep) => step.id);
                return this.connection.manager.findOne(User, {where: {id: userId}, relations: ['userData']}).then((user: User) => {
                  web3.eth.getTransactionCount(user.blockChainAccount, (_, txCount) => {
                    const txConfig = {
                      nonce: web3.utils.toHex(txCount),
                      to: contract.address,
                      gasLimit: web3.utils.toHex(1640000),
                      gasPrice: web3.utils.toHex(web3.utils.toWei('5', 'gwei')),
                      data: ethContract.methods.addProduct(savedProduct.id, ids, Date.now()).encodeABI()
                    };
                    const currentTransaction = new tx(txConfig);
                    currentTransaction.sign(Buffer.from(user.userData.unlockData,'hex'));

                    const serializedTransaction = currentTransaction.serialize();
                    const rawTransaction = '0x' + serializedTransaction.toString('hex');
                    web3.eth.sendSignedTransaction(rawTransaction, (err, txHash) => {
                      console.log('err', err, 'txHash:', txHash);
                    });
                  });
                  return savedProduct;
                });
              });
          });
        });
    });
  }
}
