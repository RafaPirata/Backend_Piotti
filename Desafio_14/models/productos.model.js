const { Schema, model } = require("mongoose");
let newDate = new Date();

const productosCollection = "productos";

const ProductSchema = new Schema({
  timestamp: {
    type: String,
    default: newDate.toLocaleString(),
  },
  nombre: {
    type: String,
    required: true,
    maxlength: 100
  },
  descripcion: {
    type: String,
    required: true,
    maxlength: 200
  },
  codigo: {
    type: String,
    required: true,
    maxlength: 8
  },
  precio: {
    type: Number,
    required: true
  },
  foto: {
    type: String,
    required: false,
    maxlength: 350
  },
  stock: {
    type: Number,
    required: true,
    default: 1
  },
});

module.exports = model(productosCollection, ProductSchema);