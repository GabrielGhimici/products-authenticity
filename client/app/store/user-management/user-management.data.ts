import { User } from '../../core/user/user';

export interface UserManagementData {
  loading: boolean;
  addingUser: boolean;
  removingUser: boolean;
  settingRight: boolean;
  users: Array<User>;
  error: any;
}
