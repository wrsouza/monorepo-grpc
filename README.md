<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

MonoRepo with gRPC, DDD, CQRS, Authentication and Authorization

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch dev gateway (default)
$ npm run start:dev

# watch dev app auth
$ npm run start:dev auth

# watch dev app customers
$ npm run start:dev customers

# watch dev app products
$ npm run start:dev products

# watch dev app orders
$ npm run start:dev orders

# watch dev library common
$ npm run start:dev common

# production mode
$ npm run start:prod
```

## Migrations

```bash
# edit/rename .env files with .env.example
- libs/common/.env
- apps/auth/.env
- apps/customers/.env
- apps/products/.env
- apps/orders/.env
- apps/gateway/.env

# generate migration script
$ npm run migration:generate libs/common/src/database/migrations/nome_da_migracao

# run migration scripts
$ npm run migration:run

# revert migration
$ npm run migration:revert
```
