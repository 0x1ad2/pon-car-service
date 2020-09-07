module.exports = {
  development: {
    client: "postgresql",
    connection: process.env.POSTGRES_CONNECTION_STRING,
    migrations: {
      tableName: "knex_migrations",
    },
  },
  production: {
    client: "postgresql",
    connection: process.env.POSTGRES_CONNECTION_STRING,
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
