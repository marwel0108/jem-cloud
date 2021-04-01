
const { getSignIn, getSignUp, postSignIn, postSignUp } = require('./auth.controllers');
const getError404 = require('./errors.controllers');
const getHome = require('./JEMCloud.controllers');
const { getFile, getFolder, getProfile, postFile } = require('./JEMClouder.controllers');

module.exports = {
    getSignIn,
    getSignUp,
    postSignIn,
    postSignUp,
    getError404,
    getHome,
    getFile,
    getFolder,
    getProfile, 
    postFile
}