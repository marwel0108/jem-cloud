const router = require('express').Router();

const { 
    getError404
} = require('../controllers/errors.controllers');

router.get('*', getError404);

module.exports = router;