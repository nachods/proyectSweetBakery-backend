const User = require("../../models/user");
const bcrypt = require("bcryptjs");

async function register(req, res) {
    const { email, password } = req.body;

    if(!email) return res.status(400).send({msg: 'Email es obligatorio'});
    if(!password) return res.status(400).send({msg: 'Password es obligatorio'});

    const user = new User({
        email: email.toLowerCase(),
        password,
    });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password,salt);
    user.password = hashPassword;

    try {
        await user.save();

        res.status(201).send({msg: 'Usuario guardado con exito'});
    } catch (error) {
        res.status(400).send({msg: `Error: ${error.message}`});
    };
};

module.exports = { register };