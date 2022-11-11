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
  connection: { filename: "../DB/ecommerce.sqlite" },
  useNullAsDefault: true,
};
const fileSystem = {
  path: "../DB",
};

module.exports = { optionsMariaDB, optionsSqlite, fileSystem };
