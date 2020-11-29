const jwt = require('jsonwebtoken');

const createJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '24h'
    }, (error, token) => {
      if (error) {
        reject('Can\'t generate token');
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = {
  createJWT
};
