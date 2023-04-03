import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/users/entities/user.entities';
import { UsersService } from 'src/users/users.service';
import { IJwtPayload } from '../entities/auth.entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      secretOrKey: configService.get<string>('token.JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: IJwtPayload): Promise<User> {
    try {
      const user = await this.userService.findOneFilter({ _id: payload._id });
      // console.log(payload);
      if (!user) {
        throw new UnauthorizedException('Jwt not accepted!');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
