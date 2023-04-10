import { Resolver, Query, Args } from '@nestjs/graphql';
import { MailService } from './mail.service';

@Resolver()
export class MailResolver {
  constructor(private mailService: MailService) {}

  @Query(() => Boolean)
  confirmMail(
    @Args('email') email: string,
    @Args('code') code: string,
  ): Promise<boolean> {
    return this.mailService.confirmEmail(email, code);
  }
}
