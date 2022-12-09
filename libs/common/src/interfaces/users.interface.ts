import { Observable } from 'rxjs';

export const USER_PACKAGE_NAME = 'users';
export const USER_SERVICE_NAME = 'UserService';

export interface IUserService {
  createUser(data: ICreateUserRequest): Observable<ICreateUserResponse>;
  userDetails(data: IUserDetailsRequest): Observable<IUserDetailsResponse>;
}

export interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  roles: string[];
}

export interface ICreateUserResponse {
  status?: number;
  error?: string[];
  id: string;
}

export interface IUserDetailsRequest {
  id: string;
}

export interface IUserDetailsResponse {
  status?: number;
  error?: string[];
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
  roles: string[];
}
