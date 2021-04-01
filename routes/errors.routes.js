const router = require('express').Router();

const { 
    getError404
} = require('../controllers/index');

router.get('*', getError404);

module.exports = router;