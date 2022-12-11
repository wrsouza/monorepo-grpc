import { IQuery } from '@nestjs/cqrs';

export class RoleDetailsQuery implements IQuery {
  constructor(readonly id: string) {}
}
