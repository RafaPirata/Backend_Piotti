const ContainerFirebase = require('../../contenedores/containerFirebase');
const logger = require('../../logger');
const { options } = require('../../options/config.js')


const db = options.firebase.connection.admin.firestore();
const query = db.collection("productos");

class ProductosDaoFirebase extends ContainerFirebase {
    constructor() {
        super(options.firebase.connection.serviceAccount)
    }

    //create Producto ------------------
  async createProduct(addProduct) {
    try {
      // let id = '2'
      const doc = query.doc(); //`${id}
      await doc.create({
        timestamp: addProduct.timestamp,
        name: addProduct.name,
        description: addProduct.description,
        price: addProduct.price,
        picture: addProduct.picture,
        code: addProduct.code,
        stock: addProduct.stock
      });
      logger.info("Producto creado: "+ addProduct)
    } catch (error) {
      logger.error("Error FB createProduct: "+ error);
    }
  }

  //leer All Products --------------------
  async getAllProducts() {
    try {
      const queryProductos = await query.get();
      const response = queryProductos.docs.map((res) => ({
        id: res.id,
        ...res.data(),
      }));
      logger.info("Productos: "+ response);
	  return response
    } catch (error) {
      logger.error("Error FB getProducts: "+ error);
    }
  }

  //leer 1 product --------------------
  async getById(id) {
    try {
    	//let id = "2";
      	const queryProducto = query.doc(`${id}`)
      	const item = await queryProducto.get()
      	const respuesta = item.data()
      	logger.info("Producto encontrado: "+ respuesta)
		return respuesta
    } catch (error) {
      logger.error("Error FB getOneProduct: "+ error);
    }
  }

  //  Update 1 Product ----------------------
  async updateProduct(id, dataBody, timestamp) {
    try {
      //let id = '1'
      const queryProductos = query.doc(`${id}`);
      const item = await queryProductos.update( {
		timestamp: timestamp,
		name: dataBody.name,
        description: dataBody.description,
        price: dataBody.price,
        picture: dataBody.picture,
        code: dataBody.code,
        stock: dataBody.stock
	  } ); //{ edad: 50 }
    logger.info("El Producto ha sido actualizado"+ item);
    } catch (error) {
      logger.error("Error FB updateProduct: "+ error);
    }
  }

  //  Delete One Product ----------------------
  async deleteProduct(id) {
    try {
      //let id = '2'
      const queryProductos = query.doc(`${id}`);
      const item = await queryProductos.delete();
      logger.info("El Producto ha sido eliminado"+ item);
		return item
    } catch (error) {
      logger.error("Error FB DeleteProduct: "+ error);
    }
  }
    
    async desconectar() {
    }
}

module.exports = ProductosDaoFirebase
//export default ProductosDaoFirebase