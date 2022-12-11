import { IQuery } from '@nestjs/cqrs';

export class PermissionDetailsQuery implements IQuery {
  constructor(readonly id: string) {}
}
