import { IUserLoginResponse } from '../../../../../../libs/common/src/interfaces';

export class UserLoginResponse implements IUserLoginResponse {
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
