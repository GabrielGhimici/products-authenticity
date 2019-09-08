export interface DataSourceData {
  loading: boolean;
  items: Array<any>;
  error: any;
}

export const DATA_SOURCES = {
  ENTITY: 'entity',
  ROLE: 'role',
  PRODUCT_TYPE: 'productType'
};
