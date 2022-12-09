import { Observable } from 'rxjs';
import {
  CreateUserRequest,
  CreateUserResponse,
  UserDetailsRequest,
  UserDetailsResponse,
} from './dto';

export interface UserService {
  createUser(data: CreateUserRequest): Observable<CreateUserResponse>;

  userDetails(data: UserDetailsRequest): Observable<UserDetailsResponse>;
}
