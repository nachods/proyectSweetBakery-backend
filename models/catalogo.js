const mongoose = require("mongoose");

const CardSchema = mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  detalle: { type: String, required: true },
  categoria: { type: String, required: true },
  image: {type: String, required: true },
  estado: { type: Boolean, required: true }, // activo o inactivo
});

module.exports = mongoose.model("Card", CardSchema);