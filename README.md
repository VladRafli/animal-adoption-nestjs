# Animal Adoption API (NestJS)

This is API Server source code for Animal Adoption Application. Ported code from Animal Adoption API using ExpressJS

Part of Thesis Project by:

- 2301943402 - Rafli Athala Jaskandi (API Developer)
- 23019..... - Aldiyan Moes T. (Mobile Developer)
- 23018..... - Julio Rivaldo (Supporting Developer)

## Links

-   [Links](#links)
-   [Development](#development)
-   [Deployment](#deployment)
-   [Code Standards](#code-standards)
-   [Libraries](#libraries)
-   [License](#license)

## Development

Soon to be available via docker-compose.

You can choose between using WSL or Virtual Machine for Windows User.

For now, deploy these as Docker Container:

- Portainer (https://hub.docker.com/r/portainer/portainer-ce) - Manage Docker Containers (Use community edition) - Copy & paste "docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest" to terminal
- Mariadb (https://hub.docker.com/_/mariadb) - Name it like "mariadb-local" - Open port 3306:3306 - Env: MARIADB_USER, MARIADB_PASSWORD, MARIADB_ROOT_PASSWORD
- PHPMyAdmin (https://hub.docker.com/_/phpmyadmin) - Copy & paste "docker run --name phpmyadmin -d --link <mariadb_container_name>:db -p 8080:80 phpmyadmin" to terminal
- Redis-Stack (https://hub.docker.com/r/redis/redis-stack) - Copy & paste "docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest" to terminal
Access database using its IP (If VM, check the IP Address).

Open port 8080 for PHPMyAdmin

Open port 8001 for Redis Insight

## Deployment

Planned deployment on AWS ECS with Domain.

## Code Standards

- Git Commit: https://commitizen-tools.github.io/commitizen/
- JSON Response: https://github.com/omniti-labs/jsend
- API Docs: https://swagger.io/resources/open-api/

## Libraries

to be written soon...

## License

This API is [GNU AGPLv3 licensed](LICENSE)

## Framework

<p align="center">This project is made possible by:</p>

<p align="center" style="font-size: 24px; font-weight: bold;">Nest JS</p>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

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

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
