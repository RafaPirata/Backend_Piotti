const socket = io();

function mostrarProductos(data) {
  const html = data
    .map((elem) => {
      return `<tr>
          <td scope="row">${elem.title}</td>
          <td scope="row">${elem.price}</td>
          <td scope="row"><img src="${elem.url}" alt="${elem.title}" height="30px"/></td>
      </tr>`;
    })
    .join(" ");
  document.getElementById("productos").innerHTML = html;
}

function mostrarMensajes(data) {
  const html = data
    .map((elem) => {
      return `<div>
                <strong style="color: blue;">${elem.username}</strong> 
                <span style="color: red;">[${new Date(
                  elem.timestamp
                ).toLocaleString()}]</span>: 
                <em style="color: green;">${elem.message}</em>
              </div>`;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
}

socket.on("products", (data) => {
  mostrarProductos(data);
});

socket.on("messages", (data) => {
  mostrarMensajes(data);
});

function addProduct() {
  const title = document.getElementById("title");
  const price = document.getElementById("price");
  const url = document.getElementById("url");
  const product = {
    title: title.value,
    price: price.value,
    url: url.value,
  };
  title.value = "";
  price.value = "";
  url.value = "";
  socket.emit("newProduct", product);
  return false;
}

function addMessage() {
  const username = document.getElementById("username");
  const message = document.getElementById("message");
  const mensaje = {
    username: username.value,
    message: message.value,
    timestamp: new Date(),
  };
  message.value = "";
  socket.emit("newMessage", mensaje);
  return false;
}
