const express = require("express");
const app = express();
const Container = require("./container/productos.js");
const container = new Container();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//seteado

app.set("views", "./views");
app.set("view engine", "pug");

//POST - GET

app.post("/productos", (req, res) => {
  const producto = req.body;
  container.guardarProducto(producto);
  res.redirect("/");
});

app.get("/productos", (req, res) => {
  const prods = container.MostrarTodos();

  res.render("hello", {
    productos: prods,
    hayProductos: prods.length,
  });
});

//llamada al puerto
const PORT = 4080;
const server = app.listen(PORT, () => {
  console.log(`Plantilla con pug en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
