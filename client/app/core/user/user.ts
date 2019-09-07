import { Role } from './role';
import { Entity } from '../entity/entity';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  roleId: number;
  parentEntityId: number;
  blockChainAccount: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  role?: Role;
  parentEntity?: Entity;
  constructor(source: {[key: string]: any} = {}) {
    this.id = source.hasOwnProperty('id') ? source.id : null;
    this.firstName = source.hasOwnProperty('firstName') ? source.firstName : null;
    this.lastName = source.hasOwnProperty('lastName') ? source.lastName : null;
    this.email = source.hasOwnProperty('email') ? source.email : null;
    this.username = source.hasOwnProperty('username') ? source.username : null;
    this.roleId = source.hasOwnProperty('roleId') ? source.roleId : null;
    this.parentEntityId = source.hasOwnProperty('parentEntityId') ? source.parentEntityId : null;
    this.blockChainAccount = source.hasOwnProperty('blockChainAccount') ? source.blockChainAccount : null;
    this.status = source.hasOwnProperty('status') ? source.status : null;
    this.createdAt = source.hasOwnProperty('createdAt') ? source.createdAt : null;
    this.updatedAt = source.hasOwnProperty('updatedAt') ? source.updatedAt : null;
    this.role = source.hasOwnProperty('role') ? new Role(source.role) : null;
    this.parentEntity = source.hasOwnProperty('parentEntity') && source.parentEntity ? new Entity(source.parentEntity) : null;
  }
}
