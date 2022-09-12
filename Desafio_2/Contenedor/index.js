const fs = require("fs");

class Container {
  constructor(file) {
    this.file = file;
  }
  //Genero un metodo privado para obtener el archivo en txt y parsear
  async #leerFile() {
    try {
      const archivo = await fs.promises.readFile(this.file, "utf-8");
      const archivoParseado = JSON.parse(archivo);
      return archivoParseado;
    } catch (err) {
      console.log(err);
      this.archivo = [];
    }
  }
  //genero un metodo para guardar nuevos productos
  async save(obj) {
    //llamo el archivo
    const contenidoArchivo = await this.#leerFile();
    //verifico si hay productos en el archivo, si no hay cargo uno y le asigno el id:1
    if (contenidoArchivo.length !== 0) {
      // genero des variables para almacenar la cantidad y su maximo id para sumarle uno
      let posicion = contenidoArchivo.length - 1;
      let idProd = Math.max(contenidoArchivo[posicion].id);
      idProd = idProd + 1;

      await fs.promises.writeFile(
        this.file,
        JSON.stringify(
          [
            ...contenidoArchivo,
            {
              ...obj,
              id: idProd,
            },
          ],
          null,
          4
        ),
        "utf-8"
      );
      console.log(`Se guardo el id: ${idProd}`);
    } else {
      await fs.promises.writeFile(
        this.file,
        JSON.stringify([{ ...obj, id: 1 }]),
        "utf-8"
      );
      console.log(
        `id: ${
          contenidoArchivo.length + 1
        } Nuevo Producto guardado con exito en Base de Datos!`
      );

      await this.getAll();
    }
  }

  // Generamos un metodo para mostrar un "id" al cual lo traemos al leer con el metodo
  // getAll leyendo el archivo con readFile
  async getById(id) {
    const content = await this.#leerFile();
    try {
      // const content = await this.getAll();
      // buscamos el id con find
      let idProd = content.find((prod) => prod.id === id);
      // mostramos el producto
      console.log(`Resultado de su busqueda segun id: ${id} es: `, idProd);
      return idProd;
    } catch (error) {
      //Emitimos mensaje en caso de error
      throw new Error(error, "Error to get the product by id");
    }
  }
  // generamos un metodo para leer el archivo fs con readFile
  async getAll() {
    try {
      const content = await this.#leerFile();
      return content;
      console.log(content);
      // let content = await fs.promises.readFile(this.file, "utf-8");
      // console.log(content);
      // // retornamos el resultado en JSON y lo parseamos
      return content;
    } catch (error) {
      // Generamos mensaje en caso de error
      throw new Error(error, "Error to get all the products");
    }
  }
  // Generamos metodo para eliminar segun id
  async deleteById(id) {
    //almacenamos en content el archivo
    const content = await this.#leerFile();
    try {
      //generamos dos variables, filtramos el id y los id no seleccionados
      const idSinEliminar = content.filter((producto) => producto.id !== id);
      const eliminarId = content.filter((producto) => producto.id === id);
      //Si existe se elimina y se sobre escriben los que existen
      if (eliminarId.length > 0) {
        await fs.promises.writeFile(
          this.file,
          JSON.stringify(idSinEliminar, null, 2)
        );
        console.log(`Se elimna id: ${id}`);
      } else {
        console.log("No existe id");
      }
    } catch (error) {
      throw new Error(error, "Error to delete the product by id");
    }
  }
  //Generamos metodo para eliminar todo el archivo y dejar un array vacio
  async deleteAll() {
    const content = await this.#leerFile();
    try {
      if (content.length > 0) {
        await fs.promises.writeFile(
          this.file,
          JSON.stringify([], null, 2),
          "utf-8"
        );
        console.log("Se eliminaron todos los productos");
      } else {
        console.log("vacio");
      }
    } catch (error) {
      throw new Error(error, "Error al querer eliminar todos los productos");
    }
  }
}

module.exports = Container;
