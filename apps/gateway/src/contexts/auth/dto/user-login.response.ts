import { IUserLoginResponse } from '@app/common/interfaces';

export class UserLoginResponse implements IUserLoginResponse {
  token: string;
}
