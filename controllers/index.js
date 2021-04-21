
const AuthControllers = require('./auth.controllers');
const errorController = require('./errors.controllers');
const JEMCloudController = require('./JEMCloud.controllers');
const JEMClouderControllers = require('./JEMClouder.controllers');

module.exports = {
    AuthControllers,
    errorController,
    JEMCloudController,
    JEMClouderControllers
}