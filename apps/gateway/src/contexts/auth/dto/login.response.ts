import { ILoginResponse } from '@app/common/interfaces';

export class LoginResponse implements ILoginResponse {
  token: string;
}
