const router = require('express').Router();
const { check } = require('express-validator');

const { emailExists, validateFields } = require('../middlewares/index');

const {
    getSignUp,
    getSignIn,
    postSignUp,
    postSignIn
} = require('../controllers/index');

router.get('/sign-up', getSignUp);

router.get('/sign-in', getSignIn);

router.post('/sign-up', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must be at least 7 characters long').isLength({ min:7 }),
    check('email', 'The email is needed').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('email').custom( emailExists ),
    validateFields
] , postSignUp);

router.post('/sign-in', [
    check('email', 'The email is needed').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'The password must be at least 7 characters long').isLength({ min: 7 }),
    validateFields
], postSignIn)

module.exports = router;