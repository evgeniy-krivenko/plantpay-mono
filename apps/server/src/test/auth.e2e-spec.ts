import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request, { Response } from 'supertest';
import cookieParser from 'cookie-parser';
import { AppModule } from '../app.module';
import { CreateUserDto } from '../modules/auth/dto/create-user.dto';
import { SignInUserDto } from '../modules/auth/dto/sign-in-user.dto';
import getCookiesFromResponse from '../helps/get-cookies';

const testingUser: CreateUserDto = {
  name: 'test',
  email: 'eqwer@empty.com',
  password: 'querty12456',
};

const correctUser: SignInUserDto = {
  email: 'vendor@email.com',
  password: 'vendor123',
};

describe('ProductController', () => {
  let app: INestApplication;
  let cookies: Record<string, any>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  it('Signup user: POST /auth/sign-up', async () => {
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
  });

  it('Signip user and correct token in cookies: POST /auth/sign-ip', async () => {
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
