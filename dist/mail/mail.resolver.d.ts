import { MailService } from './mail.service';
export declare class MailResolver {
    private mailService;
    constructor(mailService: MailService);
    confirmMail(email: string, code: string): Promise<boolean>;
}
