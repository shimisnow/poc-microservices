# Microservices POC

## Getting started

This project is a backend REST API for a simple microservice strategy created to demonstrate my abilities in backend development.

The API provides endpoints for managing users (get, create, update,  and delete). It also includes a docker-compose file to deploy the Postgres database, Apache Kafka, Kafka UI and ReDoc using Docker containers.

The database is implemented using Postgres with TypeORM. The API is built using Node.js and NestJS, providing a scalable and robust solution for handling requests.

Overall, this project demonstrates my ability to design, develop, and deploy a backend API using modern and widely-used technologies.

The following technologies was used:

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



## Deploying Postgres and Apache Kafka

```shell
docker compose up -d database zookeeper broker kafka-ui
```

## Executing the api-gateway and the user-service

```shell
nx serve user-service
```

```shell
nx serve api-gateway
```

The REST API will be available at `http://localhost:3333/api`

## Access the documentation

```shell
docker compose up -d openapi
```

The REST API documentation will be available at `http://localhost:8080`
