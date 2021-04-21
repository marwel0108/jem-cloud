const router = require('express').Router();

const { errorController } = require('../controllers/index');

router.get('*', errorController);

module.exports = router;