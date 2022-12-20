const ContainerMongoDB = require('../../contenedores/contenedorMongoDB')
const { options } = require('../../options/config.js')

const Productos = require('../../models/productos.model')
const logger = require('../../logger')

class ProductosDaoMongoDB extends ContainerMongoDB {
    constructor() {
        //super(options.mongoDB.connection.URL)
        super(options.mongoRemote.MONGO_URL_CONNECT)
    }

    async createProduct(product){
        try {
            const newProduct = new Productos(product)
            await newProduct.save()
            logger.info('Product created: ', newProduct)
        } catch (error) {
            logger.error("Error MongoDB createProduct: "+ error)
        }
    }

    async getAllProducts(){
        try {
            const products = await Productos.find()
            // console.log('Productos encontrados: ',products)
            return products
        } catch (error) {
            logger.error("Error MongoDB getProducts: " + error)
        }
    }

    async getById(id) {
        try {
            const product = await Productos.findById(`${id}`)
            logger.info('Producto encontrado: ' + product)
            return product
        } catch (error) {
            logger.error("Error MongoDB getOneProducts: " + error)
        }
    }

    async updateProduct(id, dataBody, timestamp){
        try {
            const newValues = {
                 $set: dataBody,
                 timestamp: timestamp
            }
            const product = await Productos.updateOne({ _id: id}, newValues)
            logger.info('Producto actualizado '+ product)
            return product
        } catch (error) {
            logger.error("Error MongoDB updateProduct: " + error)
        }
    }
    async deleteProduct(id) {
        const fileContent = await Productos.find();
    
        const nonDeletedProducts = fileContent.filter((item) => item.id !== id);
        const productToBeDeleted = fileContent.filter((item) => item.id === id);
    
        if (productToBeDeleted.length > 0) {
          try {
            await Productos.deleteOne({ "_id": `${id}` }) 
            // logger.info(
            //   `Producto ${JSON.stringify(
            //     productToBeDeleted,
            //     null,
            //     2
            //   )} \nEliminado con éxito de la Base de Datos!!\n`
            // );
            logger.info(`Producto con el id: ${id} eliminado con exito`)
          } catch (error) {
            logger.error("Error al escribir en archivo!! \n" + error);
          }
        } else {
          logger.info(
            "Lo sentimos, el Id del producto ingresado NO existe en nuestra Base de Datos"
          );
        }
      }

    async emptyCart(id){
        try {
            const productDeleted = await Productos.deleteOne({ "_id": `${id}` })  //{name: 'Peter'}
            logger.info('Producto eliminado: ' + JSON.stringify(productDeleted, null, 2))
            return productDeleted
        } catch (error) {
            logger.error("Error MongoDB deleteProduct: " + error)
        }
    }

    async desconectar() {
    }
}

module.exports = ProductosDaoMongoDB
// export default ProductosDaoMongoDB