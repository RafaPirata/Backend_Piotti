const express = require("express");

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const handlebars = require("express-handlebars");
const Container = require("./container/productos.js");
const Mensajes = require("./container/mensajes.js");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const container = new Container();
const messages = new Mensajes();

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/productos", app);

app.get("/productos", async (req, res) => {
  const productos = container.MostrarTodos();
  if (productos.error) res.status(200).json({ msg: "Sin productos" });
  res.status(200).json(productos);
  // res.render("vista", productos);
});

app.post("/productos", (req, res) => {
  const producto = req.body;
  container.guardarProducto(producto);
  res.status(201).json(producto);
  res.redirect("/");
});

io.on("connection", async (socket) => {
  console.log("Un socket se conecto");

  // const products = container.MostrarTodos();
  socket.emit("productos", await container.MostrarTodos());

  socket.on("add-product", async (data) => {
    await container.guardarProducto(data);
    io.sockets.emit("productos", await container.MostrarTodos());
  });

  socket.emit("mensajes", await messages.getAll());
  socket.on("nuevoMensaje", async (data) => {
    console.log(data);
    await messages.save(data);
    io.sockets.emit("mensajes", await messages.getAll());
  });
});
//--------------------------------------------

// inicio el servidor
const PORT = 3080;
httpServer.listen(PORT, () => {
  console.log(`Desafio_6 con hbs en el puerto ${httpServer.address().port}`);
});
httpServer.on("error", (error) => console.log(`Error en servidor ${error}`));
