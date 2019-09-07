import { User } from '../user/user';

export class Entity {
  id: number;
  name: string;
  type: string;
  description: string;
  legalIdentifier: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  users: User[];
  constructor(source: {[key: string]: any} = {}) {
    this.id = source.hasOwnProperty('id') ? source.id : null;
    this.name = source.hasOwnProperty('name') ? source.name : null;
    this.type = source.hasOwnProperty('type') ? source.type : null;
    this.description = source.hasOwnProperty('description') ? source.description : null;
    this.legalIdentifier = source.hasOwnProperty('legalIdentifier') ? source.legalIdentifier : null;
    this.status = source.hasOwnProperty('status') ? source.status : null;
    this.createdAt = source.hasOwnProperty('createdAt') ? source.createdAt : null;
    this.updatedAt = source.hasOwnProperty('updatedAt') ? source.updatedAt : null;
    this.users = source.hasOwnProperty('users') ? source.users.map(user => new User(user)) : [];
  }
}
