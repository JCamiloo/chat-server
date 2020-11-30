const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { createJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json({
        success: false,
        message: 'El correo ya se encuentra en uso'
      })
    }

    const user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const token = await createJWT(user.id);

    res.json({
      success: true,
      data: { user, token }
    });
  } catch(error) {
    res.status(500).json({
      success: false,
      message: 'No se pudo crear el usuario'
    });
  }
}

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(404).json({
        success: false,
        message: 'Este usuario no existe'
      });
    }

    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: 'Contraseña incorrecta'
      });
    }

    const token = await createJWT(userDB.id);

    res.json({
      success: true,
      data: { user: userDB, token }
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Algo ocurrió, contacte el administrador.'
    })
  }
}

module.exports = { createUser, login };