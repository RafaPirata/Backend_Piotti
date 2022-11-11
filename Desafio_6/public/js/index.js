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

socket.on("productos", (data) => {
  renderProducts(data);
});

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

// const server = io();

// server.on("productos", (arrayProductos) => {
//   // console.log(arrayProductos)
//   if (!arrayProductos.length) {
//     document.getElementById("datos").innerHTML =
//       "<h2>No hay productos cargados</h2>";
//   } else {
//     document.getElementById("datos").innerHTML = crearTabla(arrayProductos);
//   }
// });

// const crearTabla = (arrayProductos) => {
//   let tabla = '<table class="table table-striped table-dark">';
//   tabla +=
//     '<thead><tr><th scope="col">id</th><th scope="col">title</th><th scope="col">price</th><th scope="col">thumbnail</th></tr></thead>';
//   tabla += "<tbody>";
//   arrayProductos.forEach((producto) => {
//     tabla += `<tr>
//                         <th scope="row">${producto.id}</th>
//                             <td>${producto.title}</td>
//                             <td>${producto.price}</td>
//                             <td><img class="w-25" src="${producto.thumbnail}" alt="Imágen del producto"></td>
//                         </tr>`;
//   });
//   tabla += "</tbody></table>";
//   return tabla;
// };

// const getFetch = async (url, options) => {
//   try {
//     const resJson = await fetch(url, options);
//     const data = await resJson.json();
//     server.emit("update", "ok");
//   } catch (error) {
//     console.log(err);
//   } finally {
//     formulario.reset();
//   }
// };

// const formulario = document.querySelector("form");
// formulario.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const data = new FormData(formulario);
//   const producto = {
//     title: data.get("title"),
//     price: data.get("price"),
//     thumbnail: data.get("thumbnail"),
//   };

//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(producto),
//   };

//   getFetch("/productos", options);
// });

// async function crearTablaHbs(productos, cb) {
//   try {
//     let resText = await fetch("plantillas/tabla.hbs");
//     let plantilla = await resText.text();
//     console.log(plantilla);
//     let template = Handlebars.compile(plantilla);
//     let html = template({ productos });
//     cb(html);
//   } catch (error) {
//     console.log(error);
//   }
// }
