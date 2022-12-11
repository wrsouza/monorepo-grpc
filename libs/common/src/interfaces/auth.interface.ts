import { Observable } from 'rxjs';

export const AUTH_PACKAGE_NAME = 'auth';
export const AUTH_SERVICE_NAME = 'AuthService';

export interface IAuthService {
  userLogin(request: IUserLoginRequest): Observable<IUserLoginResponse>;
  userValidate(
    request: IUserValidateRequest,
  ): Observable<IUserValidateResponse>;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  status?: number;
  error?: string[];
  token: string;
}

export interface IUserValidateRequest {
  id: string;
  email: string;
}

export interface IUserValidateResponse {
  status?: number;
  error?: string[];
  id: string;
  name: string;
  email: string;
  createdAt: string;
  roles: string[];
}
