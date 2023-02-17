# Microservices POC

## Getting started

#### Deploying the database and Apache Kafka

```shell
docker compose up -d database zookeeper broker kafka-ui
```

#### Executing the api-gateway

```shell
nx serve api-gateway
```

The REST API will be available at `http://localhost:3333/api`

#### Executing the user-service

```shell
nx serve user-service
```

#### Access the documentation

```shell
docker compose up -d openapi
```

The REST API documentation will be available at `http://localhost:8080`

## Tecnologies

- Transfer architectural
  - REST API
  - Messaging pattern with [Apache Kafka](https://kafka.apache.org/)

- Code organization
  - Monorepo with shared code
  - [Nx](https://nx.dev/)
  - Git

- Backend
  - Node.js
  - [NestJS Framework](https://docs.nestjs.com/)
  - TypeScript

- Database
  - Postgres with [Postgis](https://postgis.net/)
  - [TypeORM](https://typeorm.io/) (with transformers)

- Documentation
  - [OpenAPI](https://www.openapis.org/)
  - [Compodoc](https://compodoc.app/) (TO-DO)

- Others
  - Docker (to deploy database, kafka, end documentation servers)
