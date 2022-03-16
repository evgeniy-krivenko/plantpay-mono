

# Plantpay Monorepo

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

Below are our core plugins:

- [React](https://reactjs.org)
- [Nest](https://nestjs.com)

## About project

This pet-project is ecommerce marketplace platform for trading plants

## Now implemented

* Authorization with JWT (access and refresh tokens)
* Pipeline for e2e tests

## How to start

* Clone project on your local hard-drive
* Install all packages in project folder - `npm i` (_node.js 16 version required_)
* Run postgres (via docker or local)
* Create `.env` file in `apps/server` folder

### `.env` for server

* DATABASE_URL="postgresql://`username`:`password`@localhost:5432/`dbname`?schema=public"
* SQL_USER="`username`"
* SQL_DATABASE="`dbname`"
* SQL_PASSWORD="`password`"
* JWT_ACCESS_TOKEN_SECRET="secret key"
* JWT_ACCESS_TOKEN_EXPIRATION_TIME="for example `1h`"
* JWT_REFRESH_TOKEN_SECRET="other secret key"
* JWT_REFRESH_TOKEN_EXPIRATION_TIME="for example `1d`"
* JWT_REFRESH_TOKEN_EXPIRATION_DAY=1 – for set cookies expiration days, must be number
* SALT=1 – for hashing password, must be number

## Server app

This app was created with Nest.JS framework

### Starting server app

```
nx serve server
```

### e2e test

e2e test's pipeline run postgres docker container (with `--rm` key, volume will remove after stop), apply prisma sql migration, prisma seed (init some data for tests), run tests and down container

for run e2e test you should run below command if nx has been global intalled

```
nx test-e2e-run server
```