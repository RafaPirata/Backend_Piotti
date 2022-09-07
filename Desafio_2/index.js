//Lammamos a Contenedor exportado con requiere y almacenamos en Container
const Container = require("./Contenedor");
// En products vamos a ir guardando los productos y esto en un archivo txt
const products = new Container("./database.txt");

///////////llamar los metodos segun la accion a realizar:///////////
//Guardar Nuevo producto
products.save({ nombre: "producto 5", precio: 50 });
//Buscar por Id
products.getById(4);
//Mostrar todos los productos
products.getAll();
//Eliminar por Id
// products.deleteById(3);
//Eliminar Todo el Archivo !!
// products.deleteAll();
