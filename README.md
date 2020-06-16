# EtiqaUserAPI

This is a technical assignment for Etiqa. It's a API build on Node.js environment that serves the UI https://github.com/jongthechemist/etiqa-user-ui

---

## Framework

It is written in TypeScript using NestJS framework which is served on top of ExpressJS.


## Routes

These are the routes that it serves:

`GET /user/list`

Get the list of users in the database


`GET /user/:id`

Get user details based on their uuid


`POST /user`

Create a new user on the DB


`PUT /user/:id`

Edit an existing user

`DELETE /user/:id`

Delete the user from the DB

## Database

It is meant to connect to MongoDB. Create a .env file and set the `MONGO_CONNECTION` variable to the DB connection string.

---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
