import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { User } from 'src/users/user.entities';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);

    const roles = this.reflector.get<string[]>('roles', ctx.getHandler());

    if (!roles) {
      return true;
    }
    const request = ctx.getContext().req;
    const user: User = request.user;
    // if (!roles.some((role) => user?.role.includes(role))) {
    //   console.log('Ban');
    //   throw new ForbiddenException('Forbidden resource');
    // }
    // your guard logic here
    console.log(
      roles.some((role) => {
        user?.role.includes(role);
        console.log(roles);
      }),
    );
    console.log('User ' + user);
    console.log('Guard');
    return true; // allow access for demonstration purposes
  }
}
