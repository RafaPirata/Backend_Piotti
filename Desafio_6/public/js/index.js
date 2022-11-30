const socket = io.connect();

const addProduct = () => {
  const newProduct = {
    title: document.getElementById("nombre").value,
    price: document.getElementById("precio").value,
    thumbnail: document.getElementById("foto").value,
  };
  socket.emit("add-product", newProduct);

  return false;
};

socket.on("productos", (data) => {
  renderProducts(data);
});

const renderProducts = (data) => {
  const html = data
    .map((el) => {
      return `
        <tr>
            <td class="px-5">
                ${el.title}
            </td>
            <td class="px-5">
                ${el.price}
            </td>
            <td class="px-5">
                <img src="${el.thumbnail}" class="h-auto" style="object-fit: cover; width: 75px;">
            </td>
        </tr>
        `;
    })
    .join(" ");
    document.getElementById("datos").innerHTML = html;
  };
  

/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */
// Definimos un esquema de autor
const schemaAuthor = new normalizr.schema.Entity('author', {}, { idAttribute: 'id' });

// Definimos un esquema de mensaje
const schemaMensaje = new normalizr.schema.Entity('post', { author: schemaAuthor }, { idAttribute: '_id' })

// Definimos un esquema de posts
const schemaMensajes = new normalizr.schema.Entity('posts', { mensajes: [ schemaMensaje ] }, { idAttribute: 'id' })
/* ----------------------------------------------------------------------------- */



const username = document.getElementById("username");
const texto = document.getElementById("texto");
const btn = document.getElementById("enviar");

function agregarMensaje(evt) {
  if (username.value === "" || texto.value === "") {
    alert("Debe ingresar el nombre y el mensaje");
  }
  const mensaje = {
    author: {
        email: username.value,
        nombre: document.getElementById('firstname').value,
        apellido: document.getElementById('lastname').value,
        edad: document.getElementById('age').value,
        alias: document.getElementById('alias').value,
        avatar: document.getElementById('avatar').value
    },
    text: texto.value
}


  socket.emit("nuevoMensaje", mensaje);
  texto.value = "";
  texto.focus();
  btn.disabled = true;
  return false;
}

socket.on("mensajes", mensajesN => {

  let mensajesNsize = JSON.stringify(mensajesN).length
  console.log(mensajesN, mensajesNsize);

  let mensajesD = normalizr.denormalize(mensajesN.result, schemaMensajes, mensajesN.entities)

  let mensajesDsize = JSON.stringify(mensajesD).length
  console.log(mensajesD, mensajesDsize);

  let porcentajeC = parseInt((mensajesNsize * 100) / mensajesDsize)
  console.log(`Porcentaje de compresión ${porcentajeC}%`)
  document.getElementById('compresion-info').innerText = porcentajeC

  console.log(mensajesD.mensajes);

  render(mensajesD.mensajes);
});

const render = (mensajes) => {
  // render wiht foreach
  let html = "";
  mensajes.forEach((mensaje) => {
    html += ` <li>       
                <strong class="card-title">${mensaje.email}</strong> 
                [<label style="color: brown;" >${mensaje.fyh}</label>] :
                <i style="color:green;">${mensaje.text}</i>
                <em class="card-text">${mensaje.avatar}</em>
            </li>`;
  });
  document.getElementById("messages").innerHTML = html;
};

username.addEventListener("input", () => {
  texto.disabled = !(username.value.length > 0);
  btn.disabled = username.value.length && texto.value.length;
});

texto.addEventListener("input", () => {
  btn.disabled = !texto.value.length;
});
