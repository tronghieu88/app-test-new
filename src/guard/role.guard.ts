import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entities';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const roles = this.reflector.get<string[]>('roles', ctx.getHandler());

    if (!roles) {
      return true;
    }
    const request = ctx.getContext().req;
    const user: User = request.user;
    // console.log(user);

    if (!roles.some((role) => user?.role.includes(role))) {
      throw new ForbiddenException('Only for ADMIN');
    }

    return true;
  }
}
