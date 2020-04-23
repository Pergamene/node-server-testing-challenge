module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/hobbits.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  // db connection for testing
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/test.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  // Heroku will look for a 'production' configuration
  production: {
    client: "pg", // npm i pg
    connection: process.env.DATABASE_URL, // provided by Heroku
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
