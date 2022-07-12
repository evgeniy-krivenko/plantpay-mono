import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import cookieParser from 'cookie-parser';
import request, { Response } from 'supertest';
import getCookiesFromResponse from '../helps/get-cookies';
import { addressStub, correctUserStub } from './users.stub';
import { AddressModel } from '@prisma/client';

describe('API tests for /address endpoint', () => {
  let app: INestApplication;
  let authToken: string;
  let address: AddressModel;
  let server;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();
    server = app.getHttpServer();
  });

  afterEach(async () => {
    await app.close();
    server.close();
  });

  it('(200) Auth user can create address', async () => {
    const resp: Response = await request(server).post('/auth/sign-in').send(correctUserStub).expect(200);
    const cookies = getCookiesFromResponse(resp);
    authToken = cookies['Access-token'];

    const response: Response = await request(server)
      .post('/address')
      .set({ Authorization: `Bearer ${authToken}` })
      .send(addressStub)
      .expect(201);
    address = response.body;
  });

  it('(401) User without token can not add address', () => {
    request(server)
      .post('/address')
      .send(addressStub)
      .expect(401);
  });

  it('(200) User with token can get array of addresses', async () => {
    const resp = await request(server)
      .get('/address')
      .set({ Authorization: `Bearer ${authToken}` })
      .expect(200);
    expect(resp.body).toBeInstanceOf(Array);
    expect(resp.body).toHaveLength(1);
    expect(resp.body[0]).toEqual({ ...addressStub, id: address.id, userId: address.userId });
  });

  it('(401) User without token can not get addresses', () => {
    request(server)
      .get('/address')
      .expect(401);
  });

  it('(200) User with token can update address', async () => {
    const newName = 'new test name';
    const response: Response = await request(server)
      .put(`/address/${address.id}`)
      .set({ Authorization: `Bearer ${authToken}` })
      .send({ ...address, name: newName })
      .expect(200);
    expect(response.body.name).toEqual(newName);
  });

  it('(401) User without token can not update address', () => {
    const newName = 'new test name';
    request(server)
      .put(`/address/${address.id}`)
      .send({ ...address, name: newName })
      .expect(401);
  });

  it('(401) User without token cat not delete address', () => {
    request(server)
      .delete(`/address/${address.id}`)
      .expect(401);
  });

  it('(200) User with token cat delete address', () => {
    request(server)
      .delete(`/address/${address.id}`)
      .set({ Authorization: `Bearer ${authToken}` })
      .expect(200);
  });
});
