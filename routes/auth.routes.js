const router = require('express').Router();
const { check } = require('express-validator');

const { emailExists, validateFields } = require('../middlewares/index');

const { AuthControllers } = require('../controllers/index');

router.get('/sign-up', AuthControllers.getSignUp);

router.get('/sign-in', AuthControllers.getSignIn);

router.post('/sign-up', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must be at least 7 characters long').isLength({ min:7 }),
    check('email', 'The email is needed').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('email').custom( emailExists ),
    validateFields
] , AuthControllers.postSignUp);

router.post('/sign-in', [
    check('email', 'The email is needed').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'The password must be at least 7 characters long').isLength({ min: 7 }),
    validateFields
], AuthControllers.postSignIn)

module.exports = router;