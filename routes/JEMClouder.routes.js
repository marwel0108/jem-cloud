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

/**
 * Post Routes
 */

router.post('/:pathToElement?',[
    validateJWT
] , JEMClouderControllers.postFile)

module.exports = router;