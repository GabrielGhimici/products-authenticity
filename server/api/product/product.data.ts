import { Required } from '@tsed/common';
import { ValidityUnit } from '../../database/entities/product.model';

export class ProductData {
  @Required()
  name: string;

  @Required()
  parentEntity: number;

  @Required()
  productType: number;

  validityTermQuantity: number;

  @Required()
  validityTermUnit: ValidityUnit;
}
