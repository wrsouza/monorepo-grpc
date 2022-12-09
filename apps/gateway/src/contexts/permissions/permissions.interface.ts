import { Observable } from 'rxjs';
import {
  CreatePermissionRequest,
  CreatePermissionResponse,
  PermissionDetailsRequest,
  PermissionDetailsResponse,
} from './dto';

export interface PermissionService {
  createPermission(
    data: CreatePermissionRequest,
  ): Observable<CreatePermissionResponse>;

  permissionDetails(
    data: PermissionDetailsRequest,
  ): Observable<PermissionDetailsResponse>;
}
