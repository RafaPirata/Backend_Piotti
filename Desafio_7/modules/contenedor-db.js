class Contenedor {
  constructor(nombreTabla, options) {
    this.nombreTabla = nombreTabla;
    this.knex = require("knex")(options);
  }

  async getAll() {
    let data = [];
    try {
      data = this.knex.from(this.nombreTabla).select("*");
    } catch (err) {
      console.log(err);
    }
    return data;
  }

  async save(obj) {
    this.knex(this.nombreTabla)
      .insert(obj)
      .then(() => console.log("data guardado!!"));
  }
  getById(id) {
    return this.knex.from(this.nombreTabla).where("id", id).select("*");
  }

  deleteById(id) {
    return this.knex.from(this.nombreTabla).where("id", id).del();
  }

  updateById(element, id) {
    console.log(element, id);
    return this.knex
      .update(element)
      .where("id", id)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  close() {
    this.knex.close();
  }
}

module.exports = Contenedor;
