import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CreateUserDto } from '../modules/auth/dto/create-user.dto';

const testingUser: CreateUserDto = {
  name: 'test',
  email: 'eqwer@empty.com',
  password: 'querty12456',
};

describe('ProductController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Signup user: POST /auth/sign-up', () => {
    return request(app.getHttpServer()).post('/auth/sign-up').send(testingUser).expect(201);
  });
});
