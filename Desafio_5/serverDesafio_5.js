// llamamos a express
const express = require("express");
const prodRutas = require("../Desafio_4/controles/router/rutas.js");
const app = express();

// llamamos a handlebars
const hbs = require("express-handlebars");
//le asignamos los parametros a Handlebars
app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    // partialsDir: __dirname + "views/partials",
    // layoutsDir: __dirname + "views/layouts",
    // con esto le digo que va debe mostrar por default ej.: layout_1
    defaultLayout: "index.hbs",
  })
);

app.use(express.urlencoded({ extended: true }));

// setamos handlebars
app.set("views", "./Desafio_5/views");
app.set("views engine", "hbs");

app.use("/api/productos", prodRutas);
app.use(express.static("public"));

//asigno el puerto a usar
const PORT = process.env.PORT || 7080;
//verificamos la conexion del puerto
const server = app.listen(PORT, () => {
  console.log(`Desafioo 5 en puerto ${server.address().port}`);
});
server.on("error", (err) => console.log(err));
