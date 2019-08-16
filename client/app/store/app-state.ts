import { AuthenticationData } from '../authentication/store/authentication.data';

export interface AppState {
  router?: any;
  authentication?: AuthenticationData;
}
