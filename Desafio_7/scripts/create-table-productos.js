const { optionsMariaDB } = require("../utils/configBases");
const knex = require("knex")(optionsMariaDB);

//------------- Crear Tablas--- Modificar nombre para crear una nueva-------------------

knex.schema
  .createTable("productos", (table) => {
    table.increments("id");
    table.string("title");
    table.float("price");
    table.string("url");
  })
  .then(() => console.log("tabla creada"))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => knex.destroy());

//----------------Eliminar un producto segun el title----------------

// knex("productos")
//   .where("title", "Hamburguesa Completa con fritas")
//   .del()
//   .then(() => console.log("Registro eliminado"))
//   .catch((err) => {
//     console.log(err);
//     throw err;
//   })
//   .finally(() => knex.destroy());

//---------------Eliminar -------------------------------
// delete
// knex('productos').del()
//     .then(() => console.log('Registro eliminado'))
//     .catch((err) => { console.log(err); throw err })
//     .finally(() => knex.destroy())
