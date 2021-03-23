const router = require('express').Router();
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/fieldsValidator')
const validateJWT = require('../middlewares/validateJWT');

const { 
    getProfile,
    getFolder,
    getFile
} = require('../controllers/JEMClouder.controllers');

/**
 * Get Routes
 */
router.get('/', [
    validateJWT,
    validateFields
] , getProfile);

router.get('/folder', getFolder);

router.get('/file', getFile);

/**
 * Post Routes
 */


module.exports = router;