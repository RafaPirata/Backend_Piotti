

const { options } = require('../options/config.js')

const { normalize, schema } = require('normalizr')

// conectado sqlite
const ContainerMessages = require('../contenedores/containerMessages')
const containerMsg = new ContainerMessages(options.filePath.pathMsg)

//conectado producto con archivo
//const ContainerProducts = require('../daos/productos/ProductosDaoArchivo.js')
//const containerProduct = new ContainerProducts(options.filePath.path)

// conectado producto con mongodb
const ContainerProducts = require('../daos/productos/ProductosDaoMongoDB')
const containerProduct = new ContainerProducts(options.mongoRemote.MONGO_URL_CONNECT) 


//--------------------------------------------
// NORMALIZACIÓN DE MENSAJES
// Definimos un esquema de autor
const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
// Definimos un esquema de mensaje
const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' })
// Definimos un esquema de posts
const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })
const normalizarMensajes = (mensajesConId) => normalize(mensajesConId, schemaMensajes)
//--------------------------------------------

const  initSocket = (io) => {
// Configuracion socket ------------
io.on('connection', async (socket) => {
    // "connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('Usuario en soket conectado - ID User: ' + socket.id )
    
    // Messages --------------------------
    socket.emit('mensajesAll', await listarMensajesNormalizados())//containerMsg.getAllMsg() ) 

    socket.on('newMensaje', async message => {
        //mensaje.fyh = new Date().toLocaleString()
        message.fyh = new Date().toLocaleString()
        await containerMsg.saveMsg(message)//mensajesApi.addMessage(mensaje)
        io.sockets.emit('mensajesAll', await listarMensajesNormalizados())
    })

    // Productos --------------------------
    socket.emit('productsAll', await containerProduct.getAllProducts() ) 

    socket.on("productsAll", async (arrProd) => {
        renderProduct(await arrProd);
        });  

    socket.on('newProducto', async (producto) => {
        console.log('Data servidor: ' + JSON.stringify(producto))

        const arrayProducts = await containerProduct.createProduct(producto)
        io.sockets.emit('productsAll', arrayProducts)
    })

    socket.on('disconnect', () => {
        console.log(`User desconectado`)
    })
})

}
async function listarMensajesNormalizados() {
    const mensajes = await containerMsg.getAllMsg()
    const normalizados = normalizarMensajes({ id: 'mensajes', mensajes })
    return normalizados
}
module.exports = initSocket