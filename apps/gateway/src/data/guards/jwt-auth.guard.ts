import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import { verify, sign } from 'jsonwebtoken';
import { firstValueFrom } from 'rxjs';
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  IAuthService,
  IUserValidateResponse,
} from '@app/common';
import { Metadata } from '@grpc/grpc-js';

interface ExternalPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtAuthGuard implements OnModuleInit, CanActivate {
  private authService: IAuthService;

  constructor(
    @Inject(AUTH_PACKAGE_NAME) private client: ClientGrpc,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.authService = this.client.getService<IAuthService>(AUTH_SERVICE_NAME);
  }

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const prefix = 'Bearer ';
    const accessToken = request.get('Authorization');
    if (!accessToken || !accessToken.includes(prefix)) {
      return false;
    }

    const payload = this.verifyExternalToken(accessToken);
    if (!payload.sub || !payload.email) {
      return false;
    }

    const user = await this.validateUser(payload);
    if (!user) {
      return false;
    }

    const internalAccessToken = this.generateInternalToken(user);
    const metadata = new Metadata();
    metadata.add('Authorization', `Bearer ${internalAccessToken}`);

    request.user = user;
    request.metadata = metadata;
    return true;
  }

  verifyExternalToken(accessToken: string): ExternalPayload {
    try {
      return verify(
        accessToken.split(' ')[1],
        this.configService.get<string>('JWT_EXTERNAL_SECRET'),
      ) as ExternalPayload;
    } catch (err) {
      return { sub: null, email: null };
    }
  }

  generateInternalToken(user: IUserValidateResponse): string {
    const internalPayload = { sub: user.id, roles: user.roles };
    const accessToken = sign(
      internalPayload,
      this.configService.get<string>('JWT_INTERNAL_SECRET'),
      { expiresIn: '60s' },
    );
    return accessToken;
  }

  validateUser(payload: ExternalPayload): Promise<IUserValidateResponse> {
    try {
      return firstValueFrom(
        this.authService.userValidate({
          id: payload.sub,
          email: payload.email,
        }),
      );
    } catch (err) {
      return null;
    }
  }
}
