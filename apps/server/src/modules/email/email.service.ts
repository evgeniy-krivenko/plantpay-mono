import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
import { CONFIRM_EMAIL_TEXT } from '@plantpay-mono/constants';

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) {
    this.nodemailerTransport = createTransport({
      service: this.configService.get('EMAIL_SERVICE'),
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  sendMail(options: Mail.Options): Promise<any> {
    return this.nodemailerTransport.sendMail(options);
  }

  sendVerificationEmail(email: string): Promise<any> {
    const payload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
    });

    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;

    const text = CONFIRM_EMAIL_TEXT + url;

    return this.sendMail({
      to: email,
      subject: 'Подтверждение регистрации',
      text,
    });
  }
}
