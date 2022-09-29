const express = require("express");
const Container = require("./container/productos.js");
const container = new Container();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//seteado

app.set("views", "./views");
app.set("view engine", "ejs");

//POST - GET

app.post("/productos", (req, res) => {
  const producto = req.body;
  container.guardarProducto(producto);
  res.redirect("/");
});

app.get("/productos", (req, res) => {
  const prods = container.MostrarTodos();

  res.render("vista", {
    productos: prods,
    existeProd: prods.length,
  });
});

//llamada al puerto
const PORT = 6080;
const server = app.listen(PORT, () => {
  console.log(`Plantilla con ejs en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
