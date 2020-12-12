const { io } = require('../index');
const { checkJWT } = require('../helpers/jwt');
const { userConnected, userDisconnected } = require('../controllers/socket');

io.on('connection', async (client) => {
  console.log('Client connected');

  const [ success, uid ] = checkJWT(client.handshake.headers['x-token']);

  if (!success) {
    return client.disconnect();
  }

  userConnected(uid);

  client.on('disconnect', () => {
    console.log('Client disconnected');
    userDisconnected(uid);
  });

  client.on('message', (payload) => {
    console.log('Message', payload);

    io.emit('message', { admin: 'New message' });
  });
});
 