import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginAccessGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    // console.log('------session------');
    // console.log(ctx.getContext().req.session);
    const session = ctx.getContext().req.session;
    // session.testSession = 'haha';
    // console.log(session);

    const req = ctx.getContext().req;
    // console.log(req);
    return req;
  }

  handleRequest(err: any, user: any, info: any) {
    // console.log(user);

    if (err || !user) {
      // console.log(info);
      if (!info) {
        throw new UnauthorizedException(err);
      }
      throw new UnauthorizedException(err);
    }
    // console.log('---user---' + user);
    return user;
  }
}
