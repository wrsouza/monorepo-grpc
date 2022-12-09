import {
  Injectable,
  CanActivate,
  ExecutionContext,
  OnModuleInit,
  Inject,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  IAuthService,
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
} from '../interfaces/auth.interface';

@Injectable()
export class GrpcAuthGuard implements OnModuleInit, CanActivate {
  private authService: IAuthService;

  constructor(@Inject(AUTH_PACKAGE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<IAuthService>(AUTH_SERVICE_NAME);
  }

  getRequest(context: ExecutionContext) {
    return context.switchToRpc().getContext();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);

    const type = context.getType();
    const prefix = 'Bearer ';

    let header: any;
    if (type === 'rpc') {
      const metadata = context.getArgByIndex(1);
      if (!metadata) {
        return false;
      }
      header = metadata.get('Authorization')[0];
    }

    if (!header || !header.includes(prefix)) {
      return false;
    }

    const token = header.slice(header.indexOf(' ') + 1);

    const result = await firstValueFrom(this.authService.validate(token));

    if (result.status !== 200) {
      return false;
    }

    request.userId = result.id;

    return true;
  }
}
