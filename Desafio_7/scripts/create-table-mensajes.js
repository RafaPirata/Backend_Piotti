const { optionsSqlite } = require("../utils/configBases");
const knex = require("knex")(optionsSqlite);

//------------- Crear Tablas--- Modificar nombre para crear una nueva-------------------

knex.schema
  .createTable("mensajes", (table) => {
    table.increments("id");
    table.string("username");
    table.string("message");
    table.dateTime("timestamp");
  })
  .then(() => console.log("tabla creada"))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => knex.destroy());
