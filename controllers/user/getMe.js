const User = require("../../models/user");

async function getMe(req, res) {
  //get
  const { user_id } = req.user;

  const user = await User.findById(user_id); //se busca el usuario en la base de datos

  if (!user) {
    //sino es true devuelve error
    res.status(400).send({ msg: "No se ha encontrado usuario" });
  } else {
    res.status(200).send(user);
  }
}

module.exports = { getMe };
