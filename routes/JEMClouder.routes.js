const router = require('express').Router();
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/fieldsValidator')
const validateJWT = require('../middlewares/validateJWT');

const { JEMClouderControllers } = require('../controllers/index');

/**
 * Get Routes
 */
router.get('/:pathToElement?', [
    validateJWT
] , JEMClouderControllers.getProfile);

// router.get('/folder', [
//     validateJWT
// ] , JEMClouderControllers.getFolder);

// router.get('/file', JEMClouderControllers.getFile);

/**
 * Post Routes
 */

router.post('/:path?',[
    validateJWT
] , JEMClouderControllers.postFile)

module.exports = router;