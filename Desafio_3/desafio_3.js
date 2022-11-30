// llamamos a express
const express = require("express");
//Lammamos a Contenedor exportado con requiere y almacenamos en Container
const Container = require("./Desafio_2/Contenedor/index.js");
const app = express();
//asigno el puerto a usar
const PORT = process.env.PORT || 8080;
//verificamos la conexion del puerto
const server = app.listen(PORT, () => {
  console.log(`El servidor en puerto ${server.address().port}`);
});
server.on("error", (err) => console.log(err));

// En products vamos a ir guardando los productos y esto en un archivo txt
const products = new Container("./Desafio_2/database.txt");

// llamamos a la raiz
app.get("/", (req, res) => {
  res.send('<h1 style="color:blue;">Hola raiz</h1>');
});
// llamamos a product con get
app.get("/productos", (req, res) => {
  products.getAll().then((prod) => res.send(prod));
  console.log("hola JSON");
});

app.get("/productoRandom", (req, res) => {
  products.getAll().then((prod) => {
    let randomNumber = Math.ceil(Math.random() * prod.length);
    products.getById(randomNumber).then((prodNum) => res.send(prodNum));
    console.log(`Hola Randon ${randomNumber}`);
  });
});

const frase = "Hola mundo como estan";
// app.get("/api/frase", (req, res) => {
//   res.status(200).json({ frase });
// });

app.get("/api/frase/", (req, res) => {
  res.status(200).json({ frase: `${frase}` });
});

app.get("/api/letras/:num", (req, res) => {
  const { num } = req.params;
  res.status(200).json({ letra: `${frase[num]}` });
});

app.get("/api/palabras/:num", (req, res) => {
  const { num } = req.params;
  let frase2 = frase.split(" ");
  res.status(200).json({ palabra: `${frase2[num]}` });
});
