export class Role {
  id: number;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(source: {[key: string]: any} = {}) {
    this.id = source.hasOwnProperty('id') ? source.id : null;
    this.name = source.hasOwnProperty('name') ? source.name : null;
    this.status = source.hasOwnProperty('status') ? source.status : null;
    this.createdAt = source.hasOwnProperty('createdAt') ? source.createdAt : null;
    this.updatedAt = source.hasOwnProperty('updatedAt') ? source.updatedAt : null;
  }
}
