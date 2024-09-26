//modelo donde se representara la estructura de los datos del sitio, y como se almacenaran
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
