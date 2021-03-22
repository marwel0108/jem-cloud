const router = require('express').Router();
const { check } = require('express-validator');

const { emailExists, validateFields } = require('../middlewares/fieldsValidator');

const {
    getSignUp,
    getSignIn,
    postUser
} = require('../controllers/auth.controllers');

router.get('/sign-up', getSignUp);

router.get('/sign-in', getSignIn);

router.post('/sign-up', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must be at least 7 chacarters long').isLength({ min:7 }),
    check('email', 'The email is needed').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('email').custom( emailExists ),
    validateFields
] , postUser)

module.exports = router;