import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

export const PERMISSION_PACKAGE_NAME = 'permissions';
export const PERMISSION_SERVICE_NAME = 'PermissionService';

export interface IPermissionService {
  createPermission(
    request: ICreatePermissionRequest,
    metadata?: Metadata,
  ): Observable<ICreatePermissionResponse>;
  permissionDetails(
    request: IPermissionDetailsRequest,
    metadata?: Metadata,
  ): Observable<IPermissionDetailsResponse>;
}

export interface ICreatePermissionRequest {
  name: string;
  description: string;
}

export interface ICreatePermissionResponse {
  status?: number;
  error?: string[];
  id: string;
}

export interface IPermissionDetailsRequest {
  id: string;
}

export interface IPermissionDetailsResponse {
  status?: number;
  error?: string[];
  id: string;
  name: string;
  description: string;
  createdAt: string;
}
