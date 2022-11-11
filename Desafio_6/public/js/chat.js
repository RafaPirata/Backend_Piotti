const socket = io.connect();

const render = (mensajes) => {
  // render wiht foreach
  let html = "";
  mensajes.forEach((mensaje) => {
    html += ` <li>       
                <strong class="card-title">${mensaje.author}</strong> 
                [<label style="color: brown;" >${mensaje.fyh}</label>] :
                <em class="card-text">${mensaje.text}</em>
            </li>`;
  });
  document.getElementById("messages").innerHTML = html;
};

socket.on("mensajes", (mensajes) => {
  render(mensajes);
});

let username = document.getElementById("username");
let texto = document.getElementById("texto");
let btn = document.getElementById("enviar");

function agregarMensaje(evt) {
  if (username.value === "" || texto.value === "") {
    alert("Debe ingresar el nombre y el mensaje");
  }

  const mensaje = {
    author: username.value,
    text: texto.value,
  };
  socket.emit("nuevoMensaje", mensaje);
  texto.value = "";
  texto.focus();

  btn.disabled = true;

  return false;
}

username.addEventListener("input", () => {
  texto.disabled = !(username.value.length > 0);
  btn.disabled = username.value.length && texto.value.length;
});

texto.addEventListener("input", () => {
  btn.disabled = !texto.value.length;
});
