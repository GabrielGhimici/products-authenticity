export interface AuthenticationData {
  loggedIn: boolean;
  signedUp: boolean;
  loggingIn: boolean;
  signingUp: boolean;
  error: any;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserSignUpData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  parentEntity?: number;
}
