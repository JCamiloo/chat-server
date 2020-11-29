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
        message: 'email already taken'
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
      success: true,
      message: 'Create user'
    });
  }
}

module.exports = { createUser };