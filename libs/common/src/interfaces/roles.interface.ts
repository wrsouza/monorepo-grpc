import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

export const ROLE_PACKAGE_NAME = 'roles';
export const ROLE_SERVICE_NAME = 'RoleService';

export interface IRoleService {
  createRole(
    request: ICreateRoleRequest,
    metadata?: Metadata,
  ): Observable<ICreateRoleResponse>;
  roleDetails(
    request: IRoleDetailsRequest,
    metadata?: Metadata,
  ): Observable<IRoleDetailsResponse>;
}

export interface ICreateRoleRequest {
  name: string;
  description: string;
  permissions: string[];
}

export interface ICreateRoleResponse {
  status?: number;
  error?: string[];
  id: string;
}

export interface IRoleDetailsRequest {
  id: string;
}

export interface IRoleDetailsResponse {
  status?: number;
  error?: string[];
  id: string;
  name: string;
  description: string;
  createdAt: string;
  permissions: string[];
}
