// llamamos a express

const express = require("express");
const prodRutas = require("./Desafio_4/controles/router/rutas.js");
//Lammamos a Contenedor exportado con requiere y almacenamos en Container
// const Container = require("./Desafio_2/Contenedor/index.js");
const app = express();
app.use(express.urlencoded({ extended: true }));
//asigno el puerto a usar
const PORT = process.env.PORT || 8080;
//verificamos la conexion del puerto
const server = app.listen(PORT, () => {
  console.log(`Desafioo 4 en puerto ${server.address().port}`);
});
server.on("error", (err) => console.log(err));

app.use("/api/productos", prodRutas);
app.use(express.static("./Desafio_4/public"));
