const socket = io.connect();
const { denormalize } = require("normalizr");

// const denormalize = denormalize;

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById("formAgregarProducto");
formAgregarProducto.addEventListener("submit", (e) => {
  e.preventDefault();
  const producto = {
    title: formAgregarProducto[0].value,
    price: formAgregarProducto[1].value,
    thumbnail: formAgregarProducto[2].value,
  };
  socket.emit("update", producto);
  formAgregarProducto.reset();
});

socket.on("productos", (productos) => {
  makeHtmlTable(productos).then((html) => {
    document.getElementById("productos").innerHTML = html;
  });
});

async function makeHtmlTable(productos) {
  const respuesta = await fetch("plantillas/tabla-productos.hbs");
  const plantilla = await respuesta.text();
  const template = Handlebars.compile(plantilla);
  const html = template({ productos });
  return html;
}

//-------------------------------------------------------------------------------------

const inputUseremail = document.getElementById("inputUseremail");
const inputUsername = document.getElementById("inputUsername");
const inputUserlastname = document.getElementById("inputUserlastname");
const inputUserage = document.getElementById("inputUserage");
const inputUser = document.getElementById("inputUser");
const inputUseravatar = document.getElementById("inputUseravatar");

const inputMensaje = document.getElementById("inputMensaje");
const btnEnviar = document.getElementById("btnEnviar");

let today = new Date();

const formPublicarMensaje = document.getElementById("formPublicarMensaje");
formPublicarMensaje.addEventListener("submit", (e) => {
  e.preventDefault();

  const mensaje = {
    id: inputUseremail.value,
    nombre: inputUsername.value,
    apellido: inputUserlastname.value,
    edad: inputUserage.value,
    alias: inputUser.value,
    avatar: inputUseravatar.value,
    texto: inputMensaje.value,
    fyh: today.toLocaleString(),
  };
  socket.emit("nuevoMensaje", mensaje);
  formPublicarMensaje.reset();
  inputMensaje.focus();
});

socket.on("mensajes", (mensajes) => {
  console.log(mensajes);

  const html = makeHtmlList(mensajes);
  document.getElementById("mensajes").innerHTML = html;
});

function makeHtmlList(mensajes) {
  return mensajes
    .map((mensaje) => {
      return `
            <div>
                <b style="color:blue;">${mensaje.autor}</b>
                [<span style="color:brown;">${mensaje.fyh}</span>] :
                <i style="color:green;">${mensaje.texto}</i>
            </div>
        `;
    })
    .join(" ");
}

inputUseremail.addEventListener("input", () => {
  const hayEmail = inputUseremail.value.length;
  const hayTexto = inputMensaje.value.length;
  inputMensaje.disabled = !hayEmail;
  btnEnviar.disabled = !hayEmail || !hayTexto;
});

inputMensaje.addEventListener("input", () => {
  const hayTexto = inputMensaje.value.length;
  btnEnviar.disabled = !hayTexto;
});
