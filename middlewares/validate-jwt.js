const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'El token es obligatorio'
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token no válido'
    })
  }
};

module.exports = { validateJWT };
