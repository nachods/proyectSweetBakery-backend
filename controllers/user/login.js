const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../../utils/jwt");

async function login(req, res) {
  const { email, password } = req.body;

  if (!email) return res.status(400).send({ msg: "Email es obligatorio" });
  if (!password)
    return res.status(400).send({ msg: "Password es obligatorio" });

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).send({ msg: "Usuario no encontrado" });
    }

    const check = await bcrypt.compare(password, user.password);

    if (!check) {
      return res.status(400).send({ msg: "Contraseña Incorrecta" });
    } else {
      return res.status(200).send({ access: jwt.createAccessToken(user) });
    }
  } catch (error) {
    return res.status(500).send({ msg: "Error en el servidor", error: error.message });
  }
};

module.exports = { login };
