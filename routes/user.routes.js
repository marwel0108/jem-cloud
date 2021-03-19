const router = require('express').Router();
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/fieldsValidator')

const { 
    getProfile,
    getFolder,
    getFile
} = require('../controllers/user.controllers');

/**
 * Get Routes
 */
router.get('/', getProfile);

router.get('/folder', getFolder);

router.get('/file', getFile);

/**
 * Post Routes
 */


module.exports = router;