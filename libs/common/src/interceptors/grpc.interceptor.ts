import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  NotFoundException,
  HttpStatus,
  ForbiddenException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class GrpcInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err.message.toUpperCase().indexOf('FORBIDDEN') !== -1) {
          return throwError(() => new ForbiddenException('Forbidden resource'));
        }
        return throwError(() => new InternalServerErrorException(err.message));
      }),
      map((value) => {
        if (value.status === HttpStatus.BAD_REQUEST)
          throw new BadRequestException(value.error);
        if (value.status === HttpStatus.NOT_FOUND)
          throw new NotFoundException(value.error);
        if (value.status === HttpStatus.FORBIDDEN)
          throw new ForbiddenException(value.error);
        if (value.status === HttpStatus.UNAUTHORIZED)
          throw new UnauthorizedException(value.error);
        if (value.status === HttpStatus.INTERNAL_SERVER_ERROR)
          throw new InternalServerErrorException(value.error);
        return value;
      }),
    );
  }
}
