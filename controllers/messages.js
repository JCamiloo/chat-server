const { response } = require('express');
const Message = require('../models/message');

const getChat = async (req, res = response) => {
  try {
    const id = req.uid;
    const messageFrom = req.params.from;
  
    const messages = await Message.find({
      $or: [{ from: id, to: messageFrom }, { from: messageFrom, to: id }]
    })
    .sort({ createdAt: 'desc' })
    .limit(30)
  
    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'No se pudo cargar el chat'
    });
  }
}

module.exports = { getChat }