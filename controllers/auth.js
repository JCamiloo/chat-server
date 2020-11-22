const { response } = require("express");

const createUser = (req, res = response) => {

  res.json({
    success: true,
    message: 'Create user'
  });
}

module.exports = { createUser };