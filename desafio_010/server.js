const { normalize, schema } = require('normalizr')

const app = require('./app') //express()
const PORT = process.env.PORT || 3000

const { options } = require('./options/config.js')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const ContainerMessages = require('./contenedores/containerMessages.js')
const containerMsg = new ContainerMessages(options.filePath.pathMsg)

const ContainerProducts = require('./daos/productos/ProductosDaoArchivo.js')
const containerProduct = new ContainerProducts(options.filePath.path) 

httpServer.listen(PORT, () => {
    console.log(`SERVER listen on port ${PORT}`)
})

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

// Configuracion socket ------------
io.on('connection', async (socket) => {
    // "connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('Usuario conectado - ID User: ' + socket.id)
    
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

    socket.on('newProducto', async (producto) => {
        console.log('Data servidor: ' + JSON.stringify(producto))
        const arrayProducts = await containerProduct.createProduct(producto)
        io.sockets.emit('productsAll', arrayProducts)
    })

    socket.on('disconnect', () => {
        console.log(`User desconectado`)
    })
})

async function listarMensajesNormalizados() {
    const mensajes = await containerMsg.getAllMsg()
    const normalizados = normalizarMensajes({ id: 'mensajes', mensajes })
    return normalizados
}

module.exports = app
