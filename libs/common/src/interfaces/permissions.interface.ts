import { Observable } from 'rxjs';

export const PERMISSION_PACKAGE_NAME = 'permissions';
export const PERMISSION_SERVICE_NAME = 'PermissionService';

export interface IPermissionService {
  createPermission(
    data: ICreatePermissionRequest,
  ): Observable<ICreatePermissionResponse>;
  permissionDetails(
    data: IPermissionDetailsRequest,
  ): Observable<IPermissionDetailsResponse>;
}

export interface ICreatePermissionRequest {
  name: string;
  description: string;
}

export interface ICreatePermissionResponse {
  id: string;
}

export interface IPermissionDetailsRequest {
  id: string;
}

export interface IPermissionDetailsResponse {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}
