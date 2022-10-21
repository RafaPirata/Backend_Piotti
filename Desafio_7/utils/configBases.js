const optionsMariaDB = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
  },
};

const optionsSqlite = {
  client: "sqlite3",
  connection: { filename: "../db/ecommerce.sqlite" },
  useNullAsDefault: true,
};

module.exports = { optionsMariaDB, optionsSqlite };
