import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';
import { ROLES_KEY } from '../decorators';

interface InternalPayload {
  sub: string;
  roles: string[];
}

@Injectable()
export class GrpcAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  getRequest(context: ExecutionContext) {
    return context.switchToRpc().getContext();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const prefix = 'Bearer ';

    const metadata = context.getArgByIndex(1);
    if (!metadata) {
      return false;
    }

    const accessToken = metadata.get('Authorization')[0];
    if (!accessToken || !accessToken.includes(prefix)) {
      return false;
    }

    const payload = this.verifyInternalToken(accessToken);
    if (!payload.sub || !payload.roles) {
      return false;
    }

    request.userId = payload.sub;
    request.metadata = metadata;

    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    const hasRole: boolean = requiredRoles.some((role) =>
      payload.roles?.includes(role),
    );
    return hasRole;
  }

  verifyInternalToken(accessToken: string): InternalPayload {
    try {
      return verify(
        accessToken.split(' ')[1],
        this.configService.get<string>('JWT_INTERNAL_SECRET'),
      ) as InternalPayload;
    } catch (err) {
      return { sub: null, roles: null };
    }
  }
}
