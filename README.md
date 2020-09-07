# Pon Car Service

## Installation

1.) Clone project

```sh
$ git clone git@github.com:0x1ad2/pon-car-service.git
```

2.) Traverse in directory

```sh
$ cd pon-car-service
```

3.) Install dependencies

```sh
$ yarn
```

4.) Run migrations (PostgreSQL), you have to insert records yourself

```sh
$ knex migrate:latest
```

5.) Create an `.env` file and add connection string

```sh
POSTGRES_CONNECTION_STRING="postgres://username@host:port/pon-db"
```

5.) Run dev build of application

```sh
$ yarn dev
```

## Endpoints

* `/` will show the index of the app, fetch data and render.
* `/api/graphql` laucnhes the Apollo GraphQL playground
