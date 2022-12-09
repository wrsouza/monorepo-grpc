import { Observable } from 'rxjs';

export const AUTH_PACKAGE_NAME = 'auth';
export const AUTH_SERVICE_NAME = 'AuthService';

export interface IAuthService {
  login(request: ILoginRequest): Observable<ILoginResponse>;
  validate(request: IValidateRequest): Observable<IValidateResponse>;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  status: number;
  error: string[];
  token: string;
}

export interface IValidateRequest {
  token: string;
}

export interface IValidateResponse {
  status: number;
  error: string[];
  id: number;
}
