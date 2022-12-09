import { Observable } from 'rxjs';
import {
  CreateRoleRequest,
  CreateRoleResponse,
  RoleDetailsRequest,
  RoleDetailsResponse,
} from './dto';

export interface RoleService {
  createRole(data: CreateRoleRequest): Observable<CreateRoleResponse>;

  roleDetails(data: RoleDetailsRequest): Observable<RoleDetailsResponse>;
}
