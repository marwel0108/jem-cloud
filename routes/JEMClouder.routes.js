const router = require('express').Router();
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/fieldsValidator')
const validateJWT = require('../middlewares/validateJWT');

const { 
    getProfile,
    getFolder,
    getFile,
    postFile
} = require('../controllers/index');

/**
 * Get Routes
 */
router.get('/', [
    validateJWT
] , getProfile);

router.get('/folder', [
    validateJWT
] , getFolder);

router.get('/file', getFile);

/**
 * Post Routes
 */

router.post('/uploadFile' , postFile)

module.exports = router;