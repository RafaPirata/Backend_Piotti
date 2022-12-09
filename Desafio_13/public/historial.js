const socket = io.connect()

//   Products historial ----------------
socket.on('productsAll', (arrProd) => {
    renderProduct(arrProd)
})

const renderProduct = (arrProd) => {
    const arrayProd = arrProd //JSON.parse(arrProd)

    const html = arrayProd.map((element) => {
        return (`<tr>
                    <td class="text-center"><strong>${element._id}</strong></td>
                    <td class="text-center">${element.nombre}</td>
                    <td class="text-center">${element.descripcion}</td>
                    <td class="text-center">${element.codigo}</td>
                    <td class="text-center">$${element.precio }</td>
                    <td class="text-center"><img class="img-fluid rounded" alt="Product Image" src='${element.foto}' width="160" height="120"></td>
                    <td class="text-center">${element.stock}</td>
                </tr>`)
    }).join(" ");

    document.getElementById('mostrarProductos').innerHTML = html

    const htmlProdList = 
        ( `<caption id="capProdList">Total Product List ${arrayProd.length}</caption>`)

    document.getElementById('capProdList').innerHTML = htmlProdList
}