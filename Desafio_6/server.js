const express = require("express");

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const handlebars = require("express-handlebars");
const Container = require("./container/productos.js");
const Mensajes = require("./container/mensajes.js");
const container = new Container();
const messages = new Mensajes();

//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


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


//--------------------------------------------
// NORMALIZACIÓN DE MENSAJES

const { normalize, schema }=require('normalizr')

// Definimos un esquema de autor
const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

// Definimos un esquema de mensaje
const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' })

// Definimos un esquema de posts
const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

const normalizarMensajes = (mensajesConId) => normalize(mensajesConId, schemaMensajes)

//--------------------------------------------


io.on("connection", async (socket) => {
  console.log("Un socket se conecto");

  // const products = container.MostrarTodos();
  socket.emit("productos", await container.MostrarTodos());

  socket.on("add-product", async (data) => {
    await container.guardarProducto(data);
    io.sockets.emit("productos", await container.MostrarTodos());
  });
  // carga inicial de mensajes
  socket.emit("mensajes", await listarMensajesNormalizados());

  // actualizacion de mensajes
  socket.on("nuevoMensaje", async (data) => {
    console.log(data);
    await messages.save(data);
    io.sockets.emit("mensajes", await listarMensajesNormalizados());
  });
});

async function listarMensajesNormalizados() {
  const mensajes = await messages.getAll()
  const normalizados = normalizarMensajes({ id: 'mensajes', mensajes })
  return normalizados
}


//--------------------------------------------

const faker = require('faker')
faker.locale = 'es'

app.get('/api/productos-test', (req, res) => {
    const CANT_PRODS = 5
    const productos = []
    for (let i = 1; i <= CANT_PRODS; i++) {
        const prod = {
            id: i,
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: `${faker.image.imageUrl()}?${i}`
        }
        productos.push(prod)
    }
    res.json(productos)
})

//--------------------------------------------

//--------------------------------------------

// inicio el servidor
const PORT = 3080;
httpServer.listen(PORT, () => {
  console.log(`Desafio_6 con hbs en el puerto ${httpServer.address().port}`);
});
httpServer.on("error", (error) => console.log(`Error en servidor ${error}`));
