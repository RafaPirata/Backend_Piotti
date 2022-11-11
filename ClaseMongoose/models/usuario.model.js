const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  nombre: {
    type: String,
    max: 100,
  },
  apellido: {
    type: String,
    max: 100,
  },
  email: {
    type: String,
    max: 100,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    max: 100,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    max: 100,
    required: true,
  },
});

module.exports = model("Usuarios", userSchema);
