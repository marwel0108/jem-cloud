require('dotenv').config();
const Server = require('./models/Server');

const expressServer = new Server();

expressServer.listen();