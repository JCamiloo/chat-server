const { response } = require('express');
const User = require('../models/user');

const getUsers = async (req, res = response) => {
  try {
    const from = Number(req.query.from) || 0;
    const to = Number(req.query.to) || 20;
  
    const users = await User.find({ _id: { $ne: req.uid } })
      .sort('-online')
      .skip(from)
      .limit(to);
  
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { getUsers };
