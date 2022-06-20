import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request, { Response } from 'supertest';
import cookieParser from 'cookie-parser';
import { AppModule } from '../app.module';
import { CreateUserDto } from '../modules/auth/dto/create-user.dto';
import { SignInUserDto } from '../modules/auth/dto/sign-in-user.dto';
import getCookiesFromResponse from '../helps/get-cookies';
import { EmailService } from '../modules/email/email.service';
import Mail from 'nodemailer/lib/mailer';
import { CONFIRM_EMAIL_TEXT } from '@plantpay-mono/constants';

const testingUser: CreateUserDto = {
  name: 'test',
  surname: 'surname',
  email: 'eqwer@empty.com',
  password: 'querty12456',
};

const correctUser: SignInUserDto = {
  email: 'vendor@email.com',
  password: 'vendor123',
};

describe('Api tests for /auth', () => {
  let app: INestApplication;
  let cookies: Record<string, any>;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  it('Signup user, get and confirm email: POST /auth/sign-up', async () => {
    const email = await app.get(EmailService);
    let emailText;
    jest.spyOn(email, 'sendMail').mockImplementation(({ text }: Mail.Options) => {
      emailText = text as string;
      return Promise.resolve();
    });
    const response = await request(app.getHttpServer()).post('/auth/sign-up').send(testingUser).expect(201);
    expect(response.body).toMatchObject({
      name: testingUser.name,
      email: testingUser.email,
      roles: [
        {
          value: 'BYIER',
          description: 'Роль покупателя',
        },
      ],
    });
    const [urlFromEmail] = emailText.split(' ').reverse();
    token = new URL(urlFromEmail).searchParams.get('token');

    expect(emailText).toContain(CONFIRM_EMAIL_TEXT);

    await request(app.getHttpServer()).post('/auth/confirm-email').send({ token }).expect(201);
    const resp: Response = await request(app.getHttpServer()).post('/auth/sign-in').send(testingUser).expect(200);

    expect('isEmailConfirmed' in resp.body && resp.body.isEmailConfirmed).toBeTruthy();
  });

  it('Sign-in user and correct token in cookies: POST /auth/sign-in', async () => {
    const resp: Response = await request(app.getHttpServer()).post('/auth/sign-in').send(correctUser).expect(200);
    cookies = getCookiesFromResponse(resp);
    expect(cookies['Access-token']).toBeTokenContaining({ email: correctUser.email });
    expect(cookies['Access-token']).toBeTokenExpiringIn('1h');
    expect(cookies['Refresh-token']).toBeTokenContaining({ email: correctUser.email });
    expect(cookies['Refresh-token']).toBeTokenExpiringIn('14d');
  });

  it('401 without refresh token: POST /auth/refresh', () => {
    return request(app.getHttpServer()).get('/auth/refresh').expect(401);
  });

  it('200 with refresh token: POST /auth/refresh', () => {
    return request(app.getHttpServer())
      .get('/auth/refresh')
      .set('Cookie', `Refresh-token=${cookies['Refresh-token']}`)
      .expect(200);
  });
});
