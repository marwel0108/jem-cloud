const router = require('express').Router();

const { 
    getHome,
    getSignIn,
    getSignUp
} = require('../controllers/client.controllers'); 

router.get('/', getHome );

router.get('/sign-in', getSignIn);

router.get('/sign-up', getSignUp);

module.exports = router;