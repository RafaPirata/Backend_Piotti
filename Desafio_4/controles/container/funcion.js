const Producto = require("../class/Products");

const validacionDato = require("../validador/validarDato");

const getAllProducts = async (req, res) => {
  try {
    const products = Producto.getProducts;
    res.json(products);
  } catch (error) {
    throw new Error(error);
  }
};

const addNewProduct = async (req, res) => {
  try {
    const { title, price, thumbnail } = req.body;
    const nuevoProducto = validacionDato(title, price, thumbnail);
    if (nuevoProducto.error) {
      res.json(nuevoProducto);
    } else {
      const producto = await Producto.add(nuevoProducto);
      res.json(producto);
    }
  } catch (error) {
    throw new Error(error);
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.getProductById(id);
    res.json(producto);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminarProducto = await Producto.delete(id);
    res.json(eliminarProducto);
  } catch (error) {
    throw new Error(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    const actualizarProducto = validacionDato(title, price, thumbnail);

    if (actualizarProducto.error) {
      res.json(actualizarProducto);
    } else {
      const producto = await Producto.update(actualizarProducto, id);
      res.json(producto);
    }
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  getAllProducts,
  addNewProduct,
  getProductById,
  deleteProduct,
  updateProduct,
};
