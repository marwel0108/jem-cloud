const router = require('express').Router();

const { check } = require('express-validator');
const { 
    getHome,
    getSignIn,
    getSignUp
} = require('../controllers/JEMCloud.controllers'); 
const { emailExists, validateFields } = require('../middlewares/fieldsValidator');

/**
 * Get routes
 */
router.get('/', getHome );

router.get('/sign-in', getSignIn);

router.get('/sign-up', getSignUp);

/**
 * Post routesg21
 */
router.post('/sign-up', [
    check('name', 'The name is needed').not().isEmpty(),
    check('password', 'The password has to be more than 6 characters').isLength({ min: 6 }),
    check('email', 'The email isn´t valid').isEmail(),
    check('email').custom( emailExists ),
    validateFields
] ,)



module.exports = router;