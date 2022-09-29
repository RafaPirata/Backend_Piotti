const express = require("express");
const handlebars = require("express-handlebars");
const Container = require("./container/productos.js");
const container = new Container();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

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

//--------------------------------------------
const PORT = 3080;
const server = app.listen(PORT, () => {
  console.log(`Plantilla con hbs en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
