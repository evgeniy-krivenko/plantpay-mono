import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request, { Response } from 'supertest';
import cookieParser from 'cookie-parser';
import { AppModule } from '../app.module';
import getCookiesFromResponse from '../helps/get-cookies';
import { EmailService } from '../modules/email/email.service';
import Mail from 'nodemailer/lib/mailer';
import { CONFIRM_EMAIL_TEXT } from '@plantpay-mono/constants';
import { correctUserStub, testingUserStub } from './users.stub';

describe('Api tests for /auth', () => {
  let app: INestApplication;
  let cookies: Record<string, any>;
  let token: string;
  let emailService: EmailService;
  let server;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();
    server = app.getHttpServer();
    emailService = await app.get(EmailService);
  });

  afterEach(async () => {
    await app.close();
    server.close();
  });

  it('Signup user, get and confirm email: POST /auth/sign-up', async () => {
    let emailText;
    jest.spyOn(emailService, 'sendMail').mockImplementation(({ text }: Mail.Options) => {
      emailText = text as string;
      return Promise.resolve();
    });
    const response = await request(server).post('/auth/sign-up').send(testingUserStub).expect(201);
    expect(response.body).toMatchObject({
      name: testingUserStub.name,
      email: testingUserStub.email,
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
    const resp: Response = await request(server).post('/auth/sign-in').send(testingUserStub).expect(200);

    expect('isEmailConfirmed' in resp.body && resp.body.isEmailConfirmed).toBeTruthy();
  });

  it('Sign-in user and correct token in cookies: POST /auth/sign-in', async () => {
    const resp: Response = await request(server).post('/auth/sign-in').send(correctUserStub).expect(200);
    cookies = getCookiesFromResponse(resp);
    expect(cookies['Access-token']).toBeTokenContaining({ email: correctUserStub.email });
    expect(cookies['Access-token']).toBeTokenExpiringIn('1h');
    expect(cookies['Refresh-token']).toBeTokenContaining({ email: correctUserStub.email });
    expect(cookies['Refresh-token']).toBeTokenExpiringIn('14d');
  });

  it('401 without refresh token: POST /auth/refresh', () => {
    return request(server).get('/auth/refresh').expect(401);
  });

  it('200 with refresh token: POST /auth/refresh', () => {
    return request(server)
      .get('/auth/refresh')
      .set('Cookie', `Refresh-token=${cookies['Refresh-token']}`)
      .expect(200);
  });
});
